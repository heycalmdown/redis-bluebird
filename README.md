# redis-bluebird

* dt에서 타입 정보를 가져와서
* typings 규정에 맞게 수정한 다음
* bluebird.promisify 규칙에 맞게 메소드 이름에 Async를 붙인 타입을 제공

코드는 아래 한 줄

```javascript
module.exports = require('bluebird').promisifyAll(require('redis'));
```


