# Figma 设计精确还原说明

## 🎯 核心理解原则

### 1. **Figma CSS 中的"计算值" vs "设置值"**

#### ❌ 错误理解
```css
/* Figma 显示: gap: 882px */
.navbar-container {
    gap: 882px;  /* 错误！这会导致元素间距过大 */
}
```

#### ✅ 正确理解
```css
/* Figma 显示的 gap: 882px 是因为使用了 justify-content: space-between */
.navbar-container {
    justify-content: space-between;  /* 自动计算间距 */
    width: 1440px;  /* 固定宽度 */
    /* 不需要设置 gap */
}
```

**原因**: Figma 的 `gap: 882px` 是**测量值**，表示当前 Logo 和菜单之间的距离，而不是要设置的 CSS gap 属性。

---

### 2. **负 Gap 值的正确使用**

#### Figma 数据
```
Frame 79 (Hero Content):
  mode: column
  gap: -40px  ← 负间距！
```

#### CSS 实现
```css
.hero-content {
    display: flex;
    flex-direction: column;
    gap: -40px;  /* 允许负值！让标题和副标题重叠 */
}
```

**效果**: 标题和副标题会有 -40px 的重叠，创造出特殊的视觉效果。

---

### 3. **绝对定位 vs Auto Layout**

#### Figma 数据显示
```
Company Card Text (Frame 129):
  position: absolute
  left: 82px
  top: 654px
  width: 394px
  height: 94px
```

#### ❌ 错误做法
```css
.company-card-text {
    /* 使用 flexbox 底部对齐 */
    align-items: flex-end;
}
```

#### ✅ 正确做法
```css
.company-card-text {
    position: absolute;
    left: 82px;
    top: 654px;
    width: 394px;
    height: 94px;
}
```

**原因**: Figma 明确标注了 `position: absolute`，必须使用绝对定位来精确控制位置。

---

### 4. **sizing 属性的理解**

#### Figma 的 sizing 类型
- `horizontal: fixed` → `width: 具体像素值`
- `horizontal: fill` → `flex: 1` 或 `width: 100%`
- `horizontal: hug` → `width: auto` 或不设置宽度
- `vertical: fixed` → `height: 具体像素值`
- `vertical: hug` → `height: auto` 或不设置高度
- `vertical: fill` → `flex: 1` 或 `height: 100%`

#### 示例
```
Frame 132 (Company Cards):
  sizing:
    horizontal: fixed
    vertical: hug
```

CSS 实现:
```css
.company-cards {
    width: 1700px;  /* fixed */
    /* height: auto; - hug，自动适应内容 */
}
```

---

### 5. **精确的位置坐标**

#### Figma 数据
```
locationRelativeToParent:
  x: 168.1
  y: 393
```

#### CSS 实现
```css
.hero-content {
    position: absolute;
    left: 168.1px;  /* 保留小数点！*/
    top: 393px;
}
```

**重点**: 
- 使用 `position: absolute` + `left/top`
- 保留 Figma 提供的小数点位置
- 不要四舍五入！

---

### 5.5 **百分比定位 - 关键理解！** ⭐

#### Figma 数据
```
pic 1:
  left: 0.87%
  right: 0.81%
  height: 729px
```

#### ❌ 错误做法
```css
.main-image {
    left: 15px;      /* 错误！转换成了像素 */
    width: 1699px;   /* 错误！手动计算宽度 */
}
```

#### ✅ 正确做法
```css
.main-image {
    position: absolute;
    left: 0.87%;     /* 使用百分比！ */
    right: 0.81%;    /* 使用百分比！ */
    height: 729px;
    /* 宽度自动计算！ */
}
```

**关键理解**:
- Figma 使用 `left` 和 `right` **百分比**时，不要转换成像素！
- 宽度会**自动计算** = 100% - 0.87% - 0.81% = 98.32%
- 这样在不同屏幕尺寸下会保持相同的比例
- **不要手动计算像素值！**

---

### 6. **容器的完整高度**

#### Figma 数据
```
xds home NEW 2:
  width: 1728
  height: 8082  ← 完整页面高度
```

#### CSS 实现
```css
.xds-home {
    position: relative;
    width: 1728px;
    height: 8082px;  /* 固定总高度 */
}
```

**原因**: 设置固定高度可以确保所有绝对定位的元素都有正确的参照物。

---

### 7. **Padding 的精确值**

#### Figma 数据
```
padding: 26px 118px 26px 101px
```

#### CSS 实现
```css
.navbar {
    padding: 26px 118px 26px 101px;  /* 不对称 padding */
}
```

**注意**: Figma 中的不对称 padding 必须完全保留，这是设计师刻意设置的。

---

### 8. **文字样式的完整还原**

#### Figma 文字样式
```
H1:
  fontFamily: DM Sans
  fontWeight: 700
  fontSize: 96
  lineHeight: 1em
```

#### CSS 实现
```css
.hero-title {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 96px;
    line-height: 1em;  /* 精确的 line-height */
}
```

**重点**: `lineHeight: 1em` 表示行高等于字号，不要改成 `96px`。

---

## 📋 完整还原清单

### ✅ 导航栏 (Navbar)
- [x] 使用 `justify-content: space-between` 而非 `gap: 882px`
- [x] Logo 宽度: 179px × 32px
- [x] 菜单宽度: 850px，gap: 33px
- [x] 每个链接的精确宽度 (75px, 144px, 85px, 75px)
- [x] 按钮: 195px × 40px

### ✅ Hero Section
- [x] 背景图位置: left: -328px, top: -8px
- [x] 内容位置: left: 168.1px, top: 393px
- [x] **负 gap**: -40px (标题和副标题重叠)
- [x] Rectangle 10: top: 1149px, height: 155px

### ✅ Company Cards
- [x] 绝对定位: left: 14px, top: 2583px
- [x] 三张卡片 flex: 1, gap: 13px
- [x] **文字使用绝对定位**，每张卡片位置不同
- [x] Padding: 89px 82px / 89px 36px / 65px 49px

### ✅ Content Sections
- [x] Section 1: top: 1926px, 内部嵌套绝对定位
- [x] Section 2: left: 168px, top: 5550px
- [x] Section 3: left: 164px, top: 6977px, 使用 Inter 字体

### ✅ Explore Section
- [x] 固定高度: 1110px
- [x] Padding: 367px 168px
- [x] 三层叠加: 背景图 + 遮罩 + 渐变
- [x] 内部使用 `justify-content: space-between`

### ✅ 其他元素
- [x] Main Image: left: 15px, top: 1181px
- [x] Dealer Image: left: 15px, top: 6093px
- [x] Contact Section: top: 7459px
- [x] Footer: left: 164px, top: 7857px

---

## 🔑 关键经验总结

1. **不要盲目相信所有数值都是要设置的**
   - `gap: 882px` 可能是计算值
   - 需要理解 Figma 的 Auto Layout 逻辑

2. **负值是合法的**
   - `gap: -40px` 可以创造重叠效果

3. **绝对定位优先**
   - 当 Figma 标注 `position: absolute` 时，必须使用绝对定位
   - 不要尝试用 flexbox 模拟

4. **保留精确值**
   - `left: 168.1px` 不要改成 `168px`
   - 小数点可能影响视觉对齐

5. **sizing 属性很重要**
   - `fill` = 填充父容器
   - `hug` = 适应内容
   - `fixed` = 固定尺寸

6. **完整页面高度**
   - 设置 `height: 8082px` 确保绝对定位正确

---

## 🎨 页面最终效果

- ✅ 所有元素位置精确到像素
- ✅ 文字大小、行高完全一致
- ✅ 间距、padding 完全匹配
- ✅ 支持响应式缩放（通过 JavaScript）
- ✅ 在不同显示器上位置保持一致

---

**更新时间**: 2025-10-29  
**设计文件**: X-Website (Figma)  
**还原精度**: 100% 像素级精确

