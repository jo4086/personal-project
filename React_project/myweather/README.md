# MyWeather 개발과정

## 개요

-  포함하는 기능
-

## 목차

-  [Chapter1. 폴더 구조 작성](#chapter1-폴더-구조-작성)

## [Chapter1. 폴더 구조 작성](#목차)

1. _Folders_
   -  api : 여러 Api 호출 폴더
   -  featuers : reducer 폴더
   -  pages : home, NotFound, weatherCategory(today, hourly3, daily5, air_pollution), Search
   -  components : Mesu, Nav, Footer, Banner, detail()
   -  components\slider :
   -  store : 리듀서 받고 내보냄
   -  styles : 기본스타일

## 개발에 추가한 기능과 이유

-  페이지가 길어지는 페이지는 스크롤바가 생겨 없는 페이지와의 width값이 달라 해당 페이지만 밀리는 현상이 발생\
   => 공통 css로 body에 [ overflow-y: scroll; ] 속성을 추가해 스크롤바가 없는 페이지도 더미 스크롤바를 추가하여 모든 페이지의 width을 맞춤

