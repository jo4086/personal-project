# 아이디어: 의사 클래스 및 의사 요소를 포함한 스타일링 자동화 시스템
### 최초 작성일: 2024/12/27 (Friday)

## 배경
현재 프로젝트에서 **의사 클래스(예: `:hover`, `:focus`)**와 **의사 요소(예: `::before`, `::placeholder`)**를 통합적으로 관리할 수 있는 스타일링 자동화 시스템을 확장하려는 아이디어입니다. 기존 시스템은 `propsFilter`와 `autoStylesProps`를 기반으로 태그 스타일과 상태 스타일을 처리하고 있으며, 이를 유지하면서 의사 요소 처리 기능을 추가합니다.

---

## 목표
1. **스타일링 구조의 확장성**:
   - 의사 요소를 포함해도 기존의 단순한 구조를 유지.
   - 새로운 의사 클래스나 요소를 추가하더라도 시스템에 쉽게 통합.

2. **재사용성 및 독립성**:
   - 재사용 컴포넌트 내부에서의 로직 단순화.
   - 복잡한 스타일링 로직은 `propsFilter`와 `autoStylesProps`에서 처리.

3. **유지보수성 향상**:
   - 의사 클래스, 의사 요소, 태그 스타일을 명확히 구분해 관리.

---

## 설계 아이디어

### 1. **스타일 종류를 3가지로 분리**
- **의사 클래스 (Pseudo-class)**:
  - 예: `:hover`, `:focus`, `:active`, `:disabled`, `:visited`

- **의사 요소 (Pseudo-element)**:
  - 예: `::before`, `::after`, `::placeholder`, `::selection`, `::marker`

- **태그 스타일 (Tag styles)**:
  - 예: `color`, `padding`, `fontSize`, `margin` 등 태그 자체에 적용되는 스타일.

### 2. **`propsFilter`에서 스타일 분리**
- 전달받은 `props`를 태그 스타일, 의사 클래스, 의사 요소로 분리.
- 각 스타일을 `$` 접두사가 붙은 키로 변환해 반환.

```javascript
const propsFilter = (props) => {
    const tagByStyles = {};
    const pseudoClassByStyles = {};
    const pseudoElementByStyles = {};

    Object.entries(props).forEach(([key, value]) => {
        const cleanKey = key.startsWith('$') ? key.slice(1) : key;

        if (pseudoClasses.some((pseudo) => cleanKey.startsWith(pseudo))) {
            pseudoClassByStyles[`$${cleanKey}`] = value;
        } else if (pseudoElements.some((pseudo) => cleanKey.startsWith(pseudo))) {
            pseudoElementByStyles[`$${cleanKey}`] = value;
        } else {
            tagByStyles[`$${cleanKey}`] = value;
        }
    });

    return { tagByStyles, pseudoClassByStyles, pseudoElementByStyles };
};
```

### 3. **`autoStylesProps`에서 최종 CSS 생성**
- `$` 접두사를 제거하고, 스타일 종류에 따라 적합한 CSS 형식으로 변환.

```javascript
const autoStylesProps = (props) => {
    const baseStyles = {};
    const pseudoClassStyles = {};
    const pseudoElementStyles = {};

    Object.entries(props).forEach(([key, value]) => {
        const cleanKey = key.startsWith('$') ? key.slice(1) : key;

        if (key.startsWith('$hover') || key.startsWith('$focus')) {
            pseudoClassStyles[cleanKey] = value;
        } else if (key.startsWith('$before') || key.startsWith('$after')) {
            pseudoElementStyles[cleanKey] = value;
        } else {
            baseStyles[cleanKey] = value;
        }
    });

    const baseCSS = Object.entries(baseStyles)
        .map(([key, value]) => `${camelToKebab({ [key]: value })}`)
        .join(' ');

    const pseudoClassCSS = Object.entries(pseudoClassStyles)
        .map(([key, value]) => `&:${key} { ${camelToKebab(value)} }`)
        .join(' ');

    const pseudoElementCSS = Object.entries(pseudoElementStyles)
        .map(([key, value]) => `&::${key} { ${camelToKebab(value)} }`)
        .join(' ');

    return `${baseCSS} ${pseudoClassCSS} ${pseudoElementCSS}`;
};
```

### 4. **재사용 컴포넌트에서 단순화**
- 재사용 컴포넌트에서는 여전히 `propsFilter`를 호출하고 `{...styledProps}`로 간단히 전달.

```javascript
const TextField = ({ display = 'flex', ...props }) => {
    const styledProps = propsFilter(props, display, true);

    return (
        <a.TextField {...styledProps}>
            <input {...styledProps} />
        </a.TextField>
    );
};
```

---

## 작업 시 주의사항
1. **스타일 구분 규칙을 명확히 정의**:
   - 의사 클래스와 의사 요소의 키를 필터링하는 로직이 명확해야 함.
   - 예를 들어, `hoverColor`는 의사 클래스, `beforeContent`는 의사 요소로 처리.

2. **테스트 케이스 작성**:
   - 다양한 조합의 프롭스를 테스트하여 필터링 및 변환 로직 검증.

3. **퍼포먼스 최적화**:
   - 많은 스타일이 한꺼번에 전달되는 경우, 불필요한 변환이나 중복 제거.

---

## 결론
이 설계를 통해 **태그 스타일, 의사 클래스, 의사 요소를 한 시스템에서 효율적으로 관리**할 수 있습니다. 프로젝트 완료 후 이 아이디어를 참고해 확장된 스타일 자동화 시스템을 구현할 수 있습니다.
