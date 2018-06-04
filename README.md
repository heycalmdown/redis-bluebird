# redis-bluebird

* dt에서 타입 정보를 가져와서
* typings 규정에 맞게 수정한 다음
* bluebird.promisify 규칙에 맞게 메소드 이름에 Async를 붙인 타입을 제공

코드는 아래 한 줄

```javascript
module.exports = require('bluebird').promisifyAll(require('redis'));
```

# References

https://redis.io/commands/
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/redis/index.d.ts

redis 2.8 기준이나, (현재 island 에서 사용하는 redis는 ^2.6)
redis command 는 return 값이 바뀌는 수준의 대격변은 없는것으로 보여서 그대로 사용
