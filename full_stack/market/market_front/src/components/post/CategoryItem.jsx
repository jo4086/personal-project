import { Text, Box, Ul, Li } from '../../styles/myUi'
import { dropdownBox, dropdownItems, dropdownItem, categoryCommon } from '../../styles/myUi/common'
import React, { useState, useRef, useEffect } from 'react'

const CategoryItem = ({ selectedBoard, onCategorySelect }) => {
    const [category2, setCategory2] = useState('── 필수 ──')
    const [isDropdown2, setDropdown2] = useState(false) // 드롭다운 열림/닫힘 상태

    const category2_dropdownRef = useRef(null)

    const category2_Options = {
        판매게시판: ['전자기기', '가전제품', '애완용품', '취미/생활', '컴퓨터/IT', '여행/레저', '패션/의류', '가구/인테리어', '유아/아동용품'],
        구매게시판: ['전자기기', '가전제품', '애완용품', '취미/생활', '컴퓨터/IT', '여행/레저', '패션/의류', '가구/인테리어', '유아/아동용품'],
        정보게시판: ['정보', '핫딜', 'IT/과학', '경제'],
    }
    // console.log(category2_Options[selectedBoard])
 

    useEffect(() => {
        setCategory2('── 필수 ──') // 2차 카테고리 초기화
        // setCategory3('── 선택 ──') // 3차 카테고리 초기화
        setDropdown2(false) // 드롭다운 상태 초기화
        // setDropdown3(false) // 드롭다운 상태 초기화
    }, [selectedBoard])

    const toggleDropdown_category2 = () => {
        setDropdown2((prev) => !prev)
    }

    const handleSelect_category2 = (category, e) => {
        e.stopPropagation() // 이벤트 전파 중단
        setCategory2(category)
        onCategorySelect(category)
        setDropdown2(false)
    }

    const closeDropdown2 = (e) => {
        if (category2_dropdownRef.current && !category2_dropdownRef.current.contains(e.target)) {
            setDropdown2(false) // 드롭다운 외부 클릭 시 닫기
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown2)
        return () => {
            document.removeEventListener('mousedown', closeDropdown2)
        }
    }, [])

    return (
        <>
            <Box {...categoryCommon} {...dropdownBox} width="120px" onClick={toggleDropdown_category2} ref={category2_dropdownRef}>
                {category2}
                {isDropdown2 && (
                    <Ul {...dropdownItems} width="120px" zIndex="2000" backgroundColor="white">
                        {category2_Options[selectedBoard]?.map((category) => (
                            <React.Fragment key={category}>
                                <Li onClick={(e) => handleSelect_category2(category, e)} {...categoryCommon} {...dropdownItem}>
                                    {category}
                                </Li>
                            </React.Fragment>
                        ))}
                    </Ul>
                )}
            </Box>
        </>
    )
}

export default CategoryItem
{
    /* 3차 카테고리 */
}
{
    /* {category2 && category3_Options[category2] && (
                <Box {...categoryCommon} {...dropdownBox} width="100px" onClick={toggleDropdown_category3} ref={category3_dropdownRef}>
                    <Text>{category2}의 세부 품목 선택</Text>
                    <Ul {...dropdownItems}>
                        {category3_Options[category2].map((item) => (
                            <Li
                                key={item}
                                onClick={(e) => handleSelect_category3(item, e)}
                                customKey={item} // key를 내려줌
                                {...dropdownItem}>
                                {item}
                            </Li>
                        ))}
                    </Ul>
                </Box>
            )}

            {category3 && <Text>선택된 품목: {category3}</Text>} */
}
