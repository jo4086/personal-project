import './css/HomeLayer.css'
import * as L from './css/leftStyled'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FlexBox from '../../item_box/FlexBox'
import Items from '../../item_box/Items'
import ItemLayout from './item_layout/ItemLayout'

import { airQualityMapper, weatherMapper } from '../../../data/mapper'

function DailyLayer({ data, region }) {
   return (
      <FlexBox>
         <Items />
      </FlexBox>
   )
}

export default DailyLayer

/* 일출일몰계산.... 오류남
import { getSunData } from '../../../data/suncalc'
const lon = data.weather.lon
const lat = data.weather.lat
const timezone = data.weather.timezone
const sunData = getSunData(lat,lon,timezone)
 */
