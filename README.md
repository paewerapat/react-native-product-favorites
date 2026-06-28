# Product Favorites App

แอปพลิเคชันแสดงรายการสินค้าจาก [Fake Store API](https://fakestoreapi.com/)
ผู้ใช้สามารถดูรายละเอียดสินค้าและบันทึกเป็น Favorites ได้ สร้างด้วย
React Native + TypeScript

---

## Features

- **Product List:** แสดงสินค้าทั้งหมดด้วย `FlatList` (รูป, ชื่อ, ราคา)
- **Pull-to-Refresh:** ลากหน้าจอลงเพื่อโหลดข้อมูลใหม่
- **Product Detail:** กดสินค้าเพื่อดูรายละเอียดเต็ม
- **Favorites:** ปุ่ม favorite ในหน้า Detail บันทึกเข้า global list
- **Favorites Tab:** หน้าแยกสำหรับดูสินค้าที่บันทึกไว้ทั้งหมด
- **Persist:** สถานะ favorite คงอยู่แม้สลับหน้าจอ และหลังปิด-เปิดแอป (AsyncStorage)
- **Remove from Favorites:** กดซ้ำเพื่อเอาออกได้
- **Animation:** หัวใจมี animation ตอนกด favorite

---

## Tech Stack

| ส่วน         | เทคโนโลยี                                               |
| ------------ | ------------------------------------------------------- |
| Framework    | React Native                                            |
| Language     | TypeScript (strict mode)                                |
| Navigation   | `@react-navigation/native` + bottom-tabs + native-stack |
| Global State | React Context API                                       |
| Persistence  | `@react-native-async-storage/async-storage`             |
| Data Source  | [Fake Store API](https://fakestoreapi.com/)             |

---

## Getting Started

> ต้องมี Node.js >= 18 และ environment สำหรับ React Native
> ([ดูคู่มือ](https://reactnative.dev/docs/environment-setup))

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. (iOS) ติดตั้ง pods
cd ios && pod install && cd ..

# 3. รัน
npm run ios       # หรือ
npm run android
```

ไม่ต้องตั้งค่า API key — Fake Store API เป็น public endpoint

---

## Project Structure

```
src/
├── api/
│   ├── client.ts             # base fetch wrapper + error handling
│   └── products.ts           # getProducts(), getProduct(id)
├── navigation/
│   ├── RootNavigator.tsx     # Bottom tabs (Products / Favorites)
│   ├── ProductsStack.tsx     # List -> Detail
│   └── types.ts              # navigation param types
├── screens/
│   ├── ProductListScreen.tsx
│   ├── ProductDetailScreen.tsx
│   └── FavoritesScreen.tsx
├── components/
│   ├── ProductCard.tsx       # row component (memoized)
│   ├── FavoriteButton.tsx    # ปุ่มหัวใจ + animation
│   ├── EmptyState.tsx
│   └── ErrorView.tsx         # error + retry
├── context/
│   └── FavoritesContext.tsx  # global favorites state + AsyncStorage
├── hooks/
│   └── useProducts.ts        # fetch list + refresh
├── types/
│   └── product.ts            # Product type
└── utils/
    └── format.ts             # format ราคา
```

แนวคิด: แยกเป็น layer ชัดเจน — **api** (สื่อสารภายนอก) → **hooks / context**
(business logic + state) → **screens & components** (UI)
UI ไม่เรียก `fetch` โดยตรง เรียกผ่าน hook เท่านั้น

---

## Architecture Decisions

ส่วนนี้อธิบายเหตุผลเบื้องหลังการตัดสินใจ (ไว้ตอบตอนสัมภาษณ์)

### 1. Global state ด้วย Context API

โจทย์ระบุ "Global Favorites List" ชัดเจน — Context + custom hook (`useFavorites`)
เพียงพอสำหรับ shared state ก้อนเดียว อ่านง่าย ไม่ต้องลาก Redux มาให้ over-engineer
_ถ้า app โตขึ้น_ (หลาย domain, async flow ซับซ้อน) จะย้ายไป Zustand/Redux Toolkit

### 2. Navigation: Bottom Tabs + nested Stack

ใช้ Bottom Tabs แยก Products กับ Favorites (ตรงกับ "separate screen or tab")
โดย tab Products มี Stack ซ้อนข้างในสำหรับ List → Detail
ทำให้แต่ละ tab จัดการ navigation ของตัวเองได้อิสระ

### 3. AsyncStorage เป็น source of truth ของ favorites

โหลด favorites เข้า Context ครั้งเดียวตอน app start แต่ละ toggle อัปเดต
ทั้ง state (re-render ทันที) และ AsyncStorage (persist) พร้อมกันแบบ optimistic
→ favorite sync ทุกหน้าจอทันที และคงอยู่หลังปิดแอป

### 4. ส่ง product ทั้ง object ผ่าน navigation

Fake Store API คืนข้อมูลครบในตัว list อยู่แล้ว จึงส่ง object ไปหน้า Detail
ได้เลย ไม่ต้อง fetch ซ้ำ — เร็วและลด API call (ต่างจากกรณีที่ detail endpoint
มีข้อมูลมากกว่า ซึ่งจะเลือก fetch ด้วย id แทน)

### 5. Expo SDK 55 แทน SDK 56 — เลี่ยง conflict กับ `@react-navigation` ตรงๆ

ตั้งแต่ SDK 56, Expo CLI มี Metro resolver check ที่ throw error ทันทีถ้าเจอ
import `@react-navigation/native-stack` หรือ `@react-navigation/drawer`
พร้อมกับ resolve เจอ `expo-router/package.json` ได้จาก project root
(ดู [migration guide](https://docs.expo.dev/router/migrate/sdk-55-to-56/))
ปัญหาคือเช็คนี้แยกแยะไม่ได้ระหว่าง "แอป import expo-router มาใช้จริง" กับ
"`expo-router` ติดมาเป็น transitive dependency ของ `@expo/cli` เอง"
(`expo` → `@expo/cli` → `expo-router`) ซึ่ง npm hoist ขึ้น root `node_modules`
เสมอ แม้โปรเจคนี้จะ **ไม่มี** `expo-router` อยู่ใน `package.json` เลยก็ตาม
ผลคือทุกโปรเจค SDK 56 ที่ตั้งใจใช้ React Navigation ตรงๆ (ไม่ใช้ expo-router)
จะโดน error นี้เสมอ ตรวจสอบแล้วว่า `@expo/cli@55.0.33` (เวอร์ชันที่คู่กับ
SDK 55) ไม่มีเช็คนี้อยู่เลย

โจทย์ระบุแค่ React Native + TypeScript + React Navigation ไม่ได้บังคับ
Expo SDK version จึงเลือก **downgrade เป็น Expo SDK 55** (ลองมาแล้วว่าตั้งแต่
แรกใช้ env var `EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1` เป็นทางแก้ก่อน
แต่เปลี่ยนใจมาทางนี้เพราะตัดปัญหาที่ต้นเหตุ ไม่ต้องมี env var แปลกๆ ใน repo
ให้คนอื่นงงว่าทำไมต้อง disable check) ทำให้ `expo-router` หายไปจาก
dependency tree ไปเลย ไม่มี conflict ให้ต้องแก้

ผลข้างเคียงที่เจอตอน downgrade: `app.json` ยังตั้ง `web.output: "static"`
ค้างมาจาก template เดิม (ใช้ static rendering ผ่าน `@expo/router-server`
ซึ่งต้องพึ่ง `expo-router`) พอ `expo-router` หายไปจริงๆ ก็ build web ไม่ผ่าน
แก้โดยเปลี่ยนเป็น `web.output: "single"` (SPA ปกติ เหมาะกับแอปที่ไม่ใช้
file-based routing อยู่แล้ว)

---

## Edge Cases ที่จัดการไว้

- **Loading state:** spinner ระหว่างโหลดครั้งแรก
- **Error + retry:** ถ้า fetch ล้มเหลว แสดง error พร้อมปุ่มลองใหม่
- **Empty favorites:** หน้า Favorites ว่าง แสดงข้อความแนะนำแทนหน้าขาว
- **รูปโหลดไม่ขึ้น:** มี placeholder
- **Favorites sync:** กด favorite ในหน้า Detail → Favorites tab อัปเดตทันที (Context)

---

## หมายเหตุเรื่อง Scope

โจทย์กำหนดเวลา 90 นาที จึงโฟกัส core requirement ให้ครบและสะอาดก่อน
แล้วจึงเก็บ bonus (remove from favorites, AsyncStorage, animation) ซึ่งทำครบทั้งหมด

**สิ่งที่จะทำต่อถ้ามีเวลา:**

- Unit test สำหรับ `FavoritesContext` และ `useProducts`
- Search / filter สินค้า
- Skeleton loading แทน spinner
