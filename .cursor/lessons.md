# 项目教训

## CSS导入顺序

**问题**: 在CSS文件中，`@import`语句必须在所有其他CSS规则之前声明（除了`@charset`和`@layer`语句），包括`@tailwind`指令。

**错误现象**:

```
⨯ ./src/styles/globals.css:861:9
Parsing css source code failed
  859 |
  860 | /* 导入手绘风格设计系统 */
> 861 | @import "./design-system/colors.css";
      |         ^
  862 | @import "./design-system/typography.css";
  863 | @import "./design-system/components.css";
  864 | @import "./design-system/utils.css";

@import rules must precede all rules aside from @charset and @layer statements at [project]/src/styles/globals.css:860:8
```

**解决方案**: 将所有`@import`语句移到`@tailwind`指令之前：

```css
/* 导入手绘风格设计系统 */
@import "./design-system/colors.css";
@import "./design-system/typography.css";
@import "./design-system/components.css";
@import "./design-system/utils.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

/* 其他CSS规则... */
```

**教训**: 在CSS中，`@import`规则有严格的位置要求，必须放在文件的最前面（除了`@charset`和`@layer`语句）。这是CSS规范的要求，目的是确保导入的样式能够被正确处理。
