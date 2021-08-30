from selenium import webdriver

driver = webdriver.Chrome()
PageNum = 1 # 시작 페이지
while PageNum <= 10: # 페이지 넘버를 사용해 자동적으로 페이지가 이동되게 while문 사용
    MuPage = f'https://magazine.musinsa.com/index.php?m=street&ordw=hit&style=014&_y=2021%2C2020%2C2019%2C2018%2C2017&_mon=&p={PageNum}#listStart'
    driver.get(MuPage)
    ImgNum = 0
    while ImgNum < 60:
        driver.find_elements_by_css_selector('.articleImg')[ImgNum].click() # 이미지 접속
        driver.get(driver.find_elements_by_css_selector('.lbox')[0].get_attribute('href')) # url 딴 후 접속을 통한 다운로드
        driver.get(MuPage)
        ImgNum += 1
    PageNum += 1