# 图片资源说明

## 需要的图片文件

请将以下图片文件复制到此文件夹中：

### 来源位置
当前图片已下载到：`C:\Users\Administrator\images\`

### 需要复制的文件

1. **bg-pic-1.png** 
   - 尺寸: 2628x1114
   - 用途: 首页英雄区域背景图片

2. **pic-1.png** 
   - 尺寸: 4096x2731
   - 用途: 第一个产品展示图片

3. **pic-3-38462f.png** 
   - 尺寸: 4096x1324
   - 用途: 第二个产品展示图片（已裁剪）

4. **logo-white.png** 
   - 尺寸: 2000x359
   - 用途: 导航栏 Logo

## 复制步骤

### 方法 1: 使用文件资源管理器
1. 打开 `C:\Users\Administrator\images\` 文件夹
2. 选择所有图片文件
3. 复制到项目的 `images\` 文件夹

### 方法 2: 使用命令行
在项目根目录运行：
```powershell
Copy-Item "C:\Users\Administrator\images\*" -Destination ".\images\" -Force
```

## 图片优化建议

为了更好的网页性能，建议：

1. **压缩图片** - 使用工具如 TinyPNG 或 ImageOptim
2. **WebP 格式** - 转换为 WebP 格式以获得更好的压缩率
3. **响应式图片** - 创建不同尺寸版本用于不同设备

## 替代图片

如果需要使用其他图片，请确保：
- 保持相同的文件名
- 或在 `index.html` 中更新图片路径
- 保持合适的纵横比以匹配设计


