# install.packages('rvest')
# install.packages('stringr')
# install.packages('httr')
# install.packages("XML", type = "binary")
# install.packages("rjson")


library(httr)
library(rvest)
library(dplyr)
library(stringr)
library(rjson)
library(jsonlite)

kdate_list = character()
kconc_list = numeric()   # Conclusion price
kfluc_list = numeric()   # Fluctuation rate

sdate_list = character()
sconc_list = numeric()
sfluc_list = numeric()

url_1 <- 'https://finance.naver.com/sise/sise_index_day.nhn?code=KOSPI&page='
url_2 <- 'https://finance.naver.com/item/frgn.nhn?code=005930&page='

ah <- httr::add_headers("User-Agent" = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36')


# KOSPI

for(page_url in 1:30){
  
  
  url_n = paste(url_1, page_url, sep = "")

  GET(url_n, ah) -> res
  content(res) %>% html_nodes("tr td.date") %>% html_text() %>% str_trim() -> date
  date
  content(res) %>% html_nodes(".number_1:nth-child(2)") %>% html_text() %>% str_trim() -> conc
  conc
  content(res) %>% html_nodes(".number_1 .p11") %>% html_text() %>% str_trim() -> fluc
  fluc

  kdate_list <- append(kdate_list, date)
  kconc_list <- append(kconc_list, conc)
  kfluc_list <- append(kfluc_list, fluc)
  kdate_list
 
}    

# SAMSUNG

for(page_url in 1:3){
  page_url <- 1
  url_n = paste(url_2, page_url, sep = "")
  
  GET(url_n, ah) -> res
  content(res) %>% html_nodes(".p10") %>% html_text() %>% str_trim() -> date
  content(res) %>% html_nodes(":nth-child(4) .num:nth-child(2) .p11") %>% html_text() %>% str_trim() -> conc
  content(res) %>% html_nodes(":nth-child(4) .num:nth-child(4) .p11") %>% html_text() %>% str_trim() -> fluc

  
  sdate_list <- append(sdate_list, date)
  sconc_list <- append(sconc_list, conc)
  sfluc_list <- append(sfluc_list, fluc)
  
}    



# matrix()
# kospi <- data.frame(kconc_list, kfluc_list, row.names = kdate_list)
kospi <- data.frame(kdate_list, kconc_list, kfluc_list)
samsung <- data.frame(sconc_list, sfluc_list)


# kospi_json <- toJSON(kospi, pretty = T)
# kospi_json
if(nrow(kospi) < nrow(samsung)){
  samsung <- na.omit(samsung[-c(nrow(kospi)+1:nrow(samsung)), ])  
}else{
  kospi <- na.omit(kospi[-c(nrow(samsung)+1:nrow(kospi)), ])  
}








# df <- data.frame(kospi, samsung)
# df
# kospi
# samsung
# # kconc_list ~ kfluc_list ~ sconc_list ~ sfluc_list
# # kdate_list kconc_list kfluc_list sdate_list sconc_list sfluc_list
# df <- cbind(kospi, samsung)
# df
# df2 <- aggregate(. ~ kdate_list,kospi,list)
# 
# json_ <-toJSON(df, pretty = T)
# json_
# test_list <- json_
# df2 <- data.frame(sdate_list, test_list)
# #write.csv(df, "R/kospi.csv", row.names = TRUE)   # .csv file
# 
# df3 <- fromJSON(file="data_full.json")
# df3
# 
# write.csv(df3, "full.csv")
# exportjson <- toJSON(df2)
# write(exportjson, file='R/date.json')
# 
