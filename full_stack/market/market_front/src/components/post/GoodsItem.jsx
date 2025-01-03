import { Text, Box, Ul, Li } from '../../styles/myUi'
import { dropdownBox, dropdownItems, dropdownItem, categoryCommon } from '../../styles/myUi/common'
import React, { useState, useRef, useEffect } from 'react'

const GoodsItem = ({ category }) => {
    const [selected_goods, setSelected_goods] = useState('── 선택 ──')
    const [isDropdown_goods, setDropdown_goods] = useState(false) // 드롭다운 열림/닫힘 상태
    const dropdownRef_goods = useRef(null)

    // console.log(category)
    const goods_Options = {
        전자기기: ['스마트폰', '태블릿', '노트북', 'TV', '기타 전자기기'],
        가전제품: ['냉장고', '세탁기', '에어컨', '청소기', '주방가전'],
        '패션/의류': ['남성의류', '여성의류', '신발', '가방', '액세서리'],
        애완용품: ['강아지', '고양이', '기타 소형 동물', '사료 및 용품'],
        '취미/생활': ['서적', '음악', '악기', '운동 용품', 'DIY', '생활 소품'],
        '가구/인테리어': ['소파', '책상', '의자', '조명', '데코 아이템'],
        '컴퓨터/IT': ['데스크탑', '노트북', '주변기기', '소프트웨어'],
        '여행/레저': ['캠핑 용품', '여행 가방', '스포츠 용품', '자전거'],
        '유아/아동용품': ['장난감', '유모차', '카시트', '유아 의류'],
    }
    // console.log(goods_Options[category])

    const toggleDropdown_goods = () => {
        setDropdown_goods((prev) => !prev)
    }
    const handleSelect_goods = (item, e) => {
        e.stopPropagation() // 이벤트 전파 중단
        setSelected_goods(item)
        setDropdown_goods(false)
    }

    const closeDropdown = (e) => {
        if (dropdownRef_goods.current && !dropdownRef_goods.current.contains(e.target)) {
            setDropdown_goods(false) // 드롭다운 외부 클릭 시 닫기
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown)
        return () => {
            document.removeEventListener('mousedown', closeDropdown)
        }
    }, [])

    return (
        <>
            <Box {...categoryCommon} {...dropdownBox} width="120px" onClick={toggleDropdown_goods} ref={dropdownRef_goods}>
                {selected_goods}
                {isDropdown_goods && (
                    <Ul {...dropdownItems} width="120px" zIndex="4000" backgroundColor="white">
                        {goods_Options[category]?.map((goods) => (
                            <React.Fragment key={goods}>
                                <Li onClick={(e) => handleSelect_goods(goods, e)} {...categoryCommon} {...dropdownItem}>
                                    {goods}
                                </Li>
                            </React.Fragment>
                        ))}
                    </Ul>
                )}
            </Box>
        </>
    )
}

export default GoodsItem
