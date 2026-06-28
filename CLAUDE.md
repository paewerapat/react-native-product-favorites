# CLAUDE.md — Context สำหรับ AI Assistant

ไฟล์นี้เป็น context ให้ AI (Claude) ช่วยทำโปรเจคนี้ ป้อนตอนเริ่ม session
หรือวางไว้ที่ root ของโปรเจค

---

## โจทย์ (Task)

**React Native Engineer – Technical Test**
สร้าง mobile app ที่ดึงสินค้าจาก API และให้ผู้ใช้ "Add to Favorites"
ทดสอบ: API integration, navigation, และ global state management

> **เวลาจำกัด 90 นาที** — โฟกัส core requirement ให้ครบและสะอาดก่อน bonus
> อย่า over-engineer เด็ดขาด

### Requirements บังคับ

**Tech Stack:** React Native, TypeScript, React Navigation

**1. Product List screen**

- ดึงข้อมูลจาก `https://fakestoreapi.com/products` (คืน array ทั้งหมดในครั้งเดียว)
- `FlatList` แต่ละแถวมี: รูป, ชื่อ, ราคา
- **Pull-to-Refresh**

**2. Product Detail**

- กดสินค้า → navigate ไปหน้า Detail

**3. Favorites**

- ปุ่ม "Favorite" ในหน้า Detail → เพิ่มเข้า **Global Favorites List**
- ต้องมี **หน้า/tab แยก** สำหรับดู Favorites
- สถานะ favorite ต้องคงอยู่เมื่อสลับไปมาระหว่างหน้าจอ

### Bonus (ทำได้แต้มเพิ่ม — ทำให้ครบ)

- Remove from Favorites
- AsyncStorage persist หลังปิดแอป
- Animation ตอนกด favorite

### Evaluation Criteria (เกณฑ์ให้คะแนน)

- Code clarity & structure
- Functional completeness
- **UI/UX design** ← ใส่ใจความสวยและ state ต่างๆ
- React Native best practices

---

## ข้อควรระวังเฉพาะโจทย์นี้ (สำคัญ)

1. **ไม่มี pagination / infinite scroll** — API คืนสินค้าทั้งหมดในครั้งเดียว
   อย่าใส่ logic pagination มาเด็ดขาด จะดูเหมือนไม่เข้าใจโจทย์
2. **ต้องมี Favorites tab/screen แยก** — โจทย์ระบุ "separate screen or tab"
3. **เน้นคำว่า "Global" favorites** — ต้องเข้าถึงได้จากทุกหน้าจอ ผ่าน Context
4. **UI/UX เป็นเกณฑ์ให้คะแนน** — loading / error / empty state ต้องครบและดูดี
5. **90 นาที** — ทำ core ให้รันได้ก่อน แล้วค่อยเก็บ bonus

---

## Tech Stack & Constraints

- **Language:** TypeScript, strict mode (เลี่ยง `any`)
- **Navigation:** React Navigation — Bottom Tabs (Products / Favorites) + native-stack ซ้อนใน Products
- **State:** React Context API สำหรับ global favorites (ห้าม Redux — over-engineer)
- **Storage:** AsyncStorage (bonus แต่ทำ)
- **HTTP:** `fetch` ของ native ไม่ต้องเพิ่ม axios

---

## หลักการที่ต้องยึด (Coding Principles)

> **เป้าหมาย: Clean Architecture + แยก concern ชัดเจน**

### Layer ที่ต้องแยก

```
api/      → สื่อสารกับ Fake Store API เท่านั้น (return typed data)
hooks/    → business logic + state (fetch, refresh)
context/  → global state (favorites)
screens/  → ประกอบ UI จาก hooks + components
components/→ UI ชิ้นเล็ก reusable ไม่มี business logic
utils/    → pure functions (format ราคา)
types/    → domain types ใช้ร่วมกัน
```

### กฎ

- **UI ห้ามเรียก `fetch` ตรงๆ** — ผ่าน hook เสมอ
- **Component แยกหน้าที่เดียว** — `ProductCard` แค่ render
- **ตั้งชื่อสื่อความหมาย** — `isRefreshing`, `isLoading`, `error`
- **Type ทุก API response** — interface ใน `types/product.ts`
- **ห้ามใส่ emoji ใน code comment**
- **Comment เฉพาะที่อธิบาย "ทำไม" ไม่ใช่ "ทำอะไร"**
- **`keyExtractor` ใช้ product id, `ProductCard` ใช้ `React.memo`**

### Favorites ต้องทำให้ถูก

- เก็บใน Context เป็น source of truth ของ runtime
- toggle → อัปเดต state + AsyncStorage พร้อมกัน (optimistic)
- โหลดจาก AsyncStorage เข้า Context ตอน app start ครั้งเดียว
- กด favorite ในหน้า Detail → Favorites tab ต้องอัปเดตทันที

---

## รูปแบบที่อยากให้ AI ตอบ

- **แสดงเฉพาะส่วนที่แก้/เพิ่ม** ไม่ต้อง paste ทั้งไฟล์ซ้ำถ้าแก้นิดเดียว
- **อธิบาย trade-off สั้นๆ** เมื่อมีทางเลือก ให้ผมตัดสินใจเอง
- **อย่าเขียนครบทั้งโปรเจคในครั้งเดียว** — ทำทีละ layer ให้ review ได้
- เวลาแนะนำ lib เพิ่ม ให้บอกเหตุผลและถามก่อน

---

## ลำดับงาน (Build Order — จัดตามเวลา 90 นาที)

**Phase 1 — Core (target ~60 นาที):**

1. Setup + ติดตั้ง deps + โครงโฟลเดอร์
2. `types/product.ts` + `api/` (client + getProducts)
3. `navigation/` (tabs + stack + param types)
4. `hooks/useProducts.ts` (fetch + refresh)
5. `ProductListScreen` + `ProductCard` (vertical slice ให้รันได้)
6. `ProductDetailScreen` (ส่ง product object ผ่าน param)
7. `FavoritesContext` + `FavoriteButton` + `FavoritesScreen`

**Phase 2 — Bonus (target ~20 นาที):** 8. AsyncStorage persist ใน Context 9. Remove from favorites (toggle) 10. Animation ตอนกด favorite

**Phase 3 — Polish (target ~10 นาที):** 11. loading / error / empty state ทุกหน้าจอ 12. README + เก็บกวาด
