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

# Versions

## 1.0.0

## 1.1.0
redis 2.8 기준으로, island 에서 사용중인 command 들을 수정.
현재 island 에서 사용하는 redis는 ^2.6 이나,
redis command 는 기능 확장만을 하고
기존 command 의 return 값이 바뀌지는 않는 것으로 보여 2.8 기준으로 작업
