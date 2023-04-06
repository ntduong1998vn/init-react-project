# USE:
- npm install
- commit and use ^^

# CUSTOMIZE: 
### custom rules of commit message:
custom ở rule key của Configuration object trong file commitlint.config.cts:
* 'type-num':
+ param 1: RuleConfigSeverity.Error/.Disabled/.Waring
+ param 2: 'always'/'never'/...
+ param 3: mảng các type-enum muốn dùng
(nếu không có rule, sẽ là rule mắc định của config-conventional)
* 'scope-enum'
+ param 1: RuleConfigSeverity.Error/.Disabled/.Waring
+ param 2: 'always'/'never'/...
+ param 3: mảng các scope-enum muốn dùng
(đọc thêm ở link https://commitlint.js.org/#/reference-rules)
