# 스타일드 컴포넌트와 커스텀 스타일링 시스템 문서

## 1. 개요
이 문서는 `id`, `className`, `propsFilter`, `autoProps`, `customStyled` 기능을 활용하여 `styled-components` 기반의 커스텀 스타일링 시스템을 구현하는 구조와 모범 사례를 설명합니다.

---

## 2. `id` 관리

### 2.1 `id`의 목적
- 각 DOM 요소를 고유하게 식별.
- CSS에서 우선순위(100점)를 부여하여 낮은 우선순위의 스타일을 덮어쓰기.

### 2.2 문제점
- HTML에서는 `id`가 문서 내에서 고유해야 함.
- 동일한 `id`를 재사용하면 충돌 및 예기치 않은 동작이 발생할 수 있음.

### 2.3 해결책
1. **동적 ID 생성**
   - 카운터를 사용해 각 요소에 고유 ID를 생성.
   - 예시:
     ```javascript
     let idCounter = 0;
     const generateUniqueId = (baseId) => {
       idCounter += 1;
       return `${baseId}-${idCounter}`;
     };
     ```
2. **페이지별 ID 초기화**
   - 페이지 렌더링 시 카운터를 초기화.
   - 예시:
     ```javascript
     useEffect(() => {
       idCounter = 0;
     }, []);
     ```
3. **컴포넌트별 카운터 관리 (WeakMap 사용)**
   - `WeakMap`을 사용하여 컴포넌트별로 카운터를 관리.
   - 예시:
     ```javascript
     const idMap = new WeakMap();
     const generateUniqueId = (component, baseId) => {
       if (!idMap.has(component)) idMap.set(component, 0);
       const currentCount = idMap.get(component) + 1;
       idMap.set(component, currentCount);
       return `${baseId}-${currentCount}`;
     };
     ```

---

## 3. `className` 관리

### 3.1 `className`의 목적
- 여러 컴포넌트에서 재사용 가능한 스타일 적용.
- CSS에서 우선순위(10점) 부여.

### 3.2 구현 방법
- `styled-components`와 `className`을 결합하여 동적으로 스타일 적용.
- 예시:
  ```javascript
  const StyledBox = styled.div`
    &.${(props) => props.className} {
      color: ${(props) => props.color || 'black'};
      border: ${(props) => props.border || '1px solid gray'};
    }
  `;
  ```
- 사용자가 `props`를 통해 동적으로 스타일을 오버라이드 가능.

---

## 4. Props 필터링과 자동화

### 4.1 `propsFilter`
- CSS 스타일링과 관련 없는 `props`를 필터링.
- 예시 구현:
  ```javascript
  const propsFilter = (props, display, text = true) => {
    const validKeys = ['color', 'backgroundColor', 'padding', 'margin', 'display'];
    return Object.keys(props).reduce((filtered, key) => {
      if (validKeys.includes(key)) {
        filtered[`$${key}`] = props[key];
      }
      return filtered;
    }, {});
  };
  ```

### 4.2 `autoProps`
- 필터링된 `props`를 기반으로 동적으로 CSS 규칙 생성.
- 예시:
  ```javascript
  const autoProps = (props) => {
    return Object.entries(props)
      .map(([key, value]) => `${key.replace('$', '')}: ${value};`)
      .join(' ');
  };
  ```

---

## 5. 커스텀 스타일드 컴포넌트

### 5.1 목적
- 스타일 정의와 유틸리티를 중앙 집중화.
- 재사용 가능하고 확장 가능한 컴포넌트 제공.

### 5.2 구조
- `customStyled.js` 예시:
  ```javascript
  import styled from 'styled-components';
  import { propsFilter, autoProps } from './utils';

  export const StyledBox = styled.div`
    ${(props) => autoProps(propsFilter(props))}
  `;
  ```

### 5.3 재사용 컴포넌트
- `ReusableBox.jsx` 예시:
  ```javascript
  import React from 'react';
  import { StyledBox } from './customStyled';

  const ReusableBox = ({ id, children, ...props }) => {
    const uniqueId = `${id}-${Math.random().toString(36).substr(2, 5)}`;
    return (
      <StyledBox id={uniqueId} {...props}>
        {children}
      </StyledBox>
    );
  };

  export default ReusableBox;
  ```

---

## 6. 모범 사례
1. **수동 ID 관리 피하기**:
   - 충돌을 방지하려면 동적 ID 생성 사용.
2. **스타일 로직 중앙화**:
   - 재사용 가능한 스타일과 유틸리티를 한 파일에 관리.
3. **동적 스타일 활용**:
   - `propsFilter`와 `autoProps`를 사용해 스타일 관리 간소화.
4. **확장성 테스트**:
   - 다수의 컴포넌트와 페이지에서도 시스템이 원활히 작동하는지 확인.

---

## 7. 향후 개선 사항
- 전역 카운터 관리를 위해 `LocalStorage` 또는 `Context API` 지원 추가.
- `propsFilter`를 확장하여 더 고급 CSS 속성 지원.
- 대규모 애플리케이션을 위한 성능 최적화 통합.

---

## 8. 결론
이 시스템은 `styled-components`를 사용하여 ID, 클래스, 동적 스타일을 관리하는 견고한 기반을 제공합니다. 적절한 개선과 테스트를 통해 복잡한 프로젝트에도 효율적으로 확장할 수 있습니다.

