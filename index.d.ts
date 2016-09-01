declare var redis: redis.RedisStatic;

declare namespace redis {
    export interface ClientOpts {
        parser?: string;
        return_buffers?: boolean;
        detect_buffers?: boolean;
        socket_nodelay?: boolean;
        socket_keepalive?: boolean;
        no_ready_check?: boolean;
        enable_offline_queue?: boolean;
        retry_max_delay?: number;
        connect_timeout?: number;
        max_attempts?: number;
        auth_pass?: string;
        password?: string;
        family?: string;
        command_queue_high_water?: number;
        command_queue_low_water?: number;
    }

    interface ResCallbackT<R> {
        (err: Error, res: R): void;
    }

    interface ServerInfo {
        redis_version: string;
        versions: number[];
    }

    interface CommandT<R> { //This is a placeholder to be used eventually, to not have to define each command twice, or four times if all caps versions are to be implemented.
        (args: any[], callback?: redis.ResCallbackT<R>): void;
        (...args: any[]): void;
    }

    interface MessageHandler<M> {
        (channel: string, message: M): void;
    }

    export interface RedisClient extends NodeJS.EventEmitter {
        // event: connect
        // event: error
        // event: message
        // event: pmessage
        // event: subscribe
        // event: psubscribe
        // event: unsubscribe
        // event: punsubscribe

        connected: boolean;
        retry_delay: number;
        retry_backoff: number;
        command_queue: any[];
        offline_queue: any[];
        server_info: redis.ServerInfo;

        end(): void;
        unref(): void;

        // Low level command execution
        send_command(command: string, ...args: any[]): boolean;

        // Connection (http://redis.io/commands#connection)
        auth(password: string, callback?: redis.ResCallbackT<any>): boolean;
        ping(callback?: redis.ResCallbackT<number>): boolean;

        // Strings (http://redis.io/commands#strings)
        append(key: string, value: string, callback?: redis.ResCallbackT<number>): boolean;
        bitcount(key: string, callback?: redis.ResCallbackT<number>): boolean;
        bitcount(key: string, start: number, end: number, callback?: redis.ResCallbackT<number>): boolean;
        set(key: string, value: string, callback?: redis.ResCallbackT<string>): boolean;
        get(key: string, callback?: redis.ResCallbackT<string>): boolean;
        exists(key: string, value: string, callback?: redis.ResCallbackT<number>): boolean;

        publish(channel: string, value: any): boolean;
        subscribe(channel: string): boolean;

        /*
        commands = set_union([
        "get", "set", "setnx", "setex", "append", "strlen", "del", "exists", "setbit", "getbit", "setrange", "getrange", "substr",
        "incr", "decr", "mget", "rpush", "lpush", "rpushx", "lpushx", "linsert", "rpop", "lpop", "brpop", "brpoplpush", "blpop", "llen", "lindex",
        "lset", "lrange", "ltrim", "lrem", "rpoplpush", "sadd", "srem", "smove", "sismember", "scard", "spop", "srandmember", "sinter", "sinterstore",
        "sunion", "sunionstore", "sdiff", "sdiffstore", "smembers", "zadd", "zincrby", "zrem", "zremrangebyscore", "zremrangebyrank", "zunionstore",
        "zinterstore", "zrange", "zrangebyscore", "zrevrangebyscore", "zcount", "zrevrange", "zcard", "zscore", "zrank", "zrevrank", "hset", "hsetnx",
        "hget", "hmset", "hmget", "hincrby", "hdel", "hlen", "hkeys", "hvals", "hgetall", "hexists", "incrby", "decrby", "getset", "mset", "msetnx",
        "randomkey", "select", "move", "rename", "renamenx", "expire", "expireat", "keys", "dbsize", "auth", "ping", "echo", "save", "bgsave",
        "bgrewriteaof", "shutdown", "lastsave", "type", "multi", "exec", "discard", "sync", "flushdb", "flushall", "sort", "info", "monitor", "ttl",
        "persist", "slaveof", "debug", "config", "subscribe", "unsubscribe", "psubscribe", "punsubscribe", "publish", "watch", "unwatch", "cluster",
        "restore", "migrate", "dump", "object", "client", "eval", "evalsha"], require("./lib/commands"));
        */

        get(args: any[], callback?: redis.ResCallbackT<string>): boolean;
        get(...args: any[]): boolean;
        getAsync<T>(...args: any[]): Promise<T>
        set(args: any[], callback?: redis.ResCallbackT<string>): boolean;
        set(...args: any[]): boolean;
        setAsync<T>(...args: any[]): Promise<T>
        setnx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        setnx(...args: any[]): boolean;
        setnxAsync<T>(...args: any[]): Promise<T>
        setex(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        setex(...args: any[]): boolean;
        setexAsync<T>(...args: any[]): Promise<T>
        append(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        append(...args: any[]): boolean;
        appendAsync<T>(...args: any[]): Promise<T>
        strlen(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        strlen(...args: any[]): boolean;
        strlenAsync<T>(...args: any[]): Promise<T>
        del(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        del(...args: any[]): boolean;
        delAsync<T>(...args: any[]): Promise<T>
        exists(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        exists(...args: any[]): boolean;
        existsAsync<T>(...args: any[]): Promise<T>
        setbit(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        setbit(...args: any[]): boolean;
        setbitAsync<T>(...args: any[]): Promise<T>
        getbit(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        getbit(...args: any[]): boolean;
        getbitAsync<T>(...args: any[]): Promise<T>
        setrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        setrange(...args: any[]): boolean;
        setrangeAsync<T>(...args: any[]): Promise<T>
        getrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        getrange(...args: any[]): boolean;
        getrangeAsync<T>(...args: any[]): Promise<T>
        substr(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        substr(...args: any[]): boolean;
        substrAsync<T>(...args: any[]): Promise<T>
        incr(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        incr(...args: any[]): boolean;
        incrAsync<T>(...args: any[]): Promise<T>
        decr(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        decr(...args: any[]): boolean;
        decrAsync<T>(...args: any[]): Promise<T>
        mget(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        mget(...args: any[]): boolean;
        mgetAsync<T>(...args: any[]): Promise<T>
        rpush(...args: any[]): boolean;
        rpushAsync<T>(...args: any[]): Promise<T>
        lpush(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lpush(...args: any[]): boolean;
        lpushAsync<T>(...args: any[]): Promise<T>
        rpushx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        rpushx(...args: any[]): boolean;
        rpushxAsync<T>(...args: any[]): Promise<T>
        lpushx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lpushx(...args: any[]): boolean;
        lpushxAsync<T>(...args: any[]): Promise<T>
        linsert(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        linsert(...args: any[]): boolean;
        linsertAsync<T>(...args: any[]): Promise<T>
        rpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        rpop(...args: any[]): boolean;
        rpopAsync<T>(...args: any[]): Promise<T>
        lpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lpop(...args: any[]): boolean;
        lpopAsync<T>(...args: any[]): Promise<T>
        brpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        brpop(...args: any[]): boolean;
        brpopAsync<T>(...args: any[]): Promise<T>
        brpoplpush(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        brpoplpush(...args: any[]): boolean;
        brpoplpushAsync<T>(...args: any[]): Promise<T>
        blpop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        blpop(...args: any[]): boolean;
        blpopAsync<T>(...args: any[]): Promise<T>
        llen(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        llen(...args: any[]): boolean;
        llenAsync<T>(...args: any[]): Promise<T>
        lindex(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lindex(...args: any[]): boolean;
        lindexAsync<T>(...args: any[]): Promise<T>
        lset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lset(...args: any[]): boolean;
        lsetAsync<T>(...args: any[]): Promise<T>
        lrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lrange(...args: any[]): boolean;
        lrangeAsync<T>(...args: any[]): Promise<T>
        ltrim(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        ltrim(...args: any[]): boolean;
        ltrimAsync<T>(...args: any[]): Promise<T>
        lrem(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lrem(...args: any[]): boolean;
        lremAsync<T>(...args: any[]): Promise<T>
        rpoplpush(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        rpoplpush(...args: any[]): boolean;
        rpoplpushAsync<T>(...args: any[]): Promise<T>
        sadd(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sadd(...args: any[]): boolean;
        saddAsync<T>(...args: any[]): Promise<T>
        srem(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        srem(...args: any[]): boolean;
        sremAsync<T>(...args: any[]): Promise<T>
        smove(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        smove(...args: any[]): boolean;
        smoveAsync<T>(...args: any[]): Promise<T>
        sismember(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sismember(...args: any[]): boolean;
        sismemberAsync<T>(...args: any[]): Promise<T>
        scard(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        scard(...args: any[]): boolean;
        scardAsync<T>(...args: any[]): Promise<T>
        spop(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        spop(...args: any[]): boolean;
        spopAsync<T>(...args: any[]): Promise<T>
        srandmember(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        srandmember(...args: any[]): boolean;
        srandmemberAsync<T>(...args: any[]): Promise<T>
        sinter(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sinter(...args: any[]): boolean;
        sinterAsync<T>(...args: any[]): Promise<T>
        sinterstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sinterstore(...args: any[]): boolean;
        sinterstoreAsync<T>(...args: any[]): Promise<T>
        sunion(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sunion(...args: any[]): boolean;
        sunionAsync<T>(...args: any[]): Promise<T>
        sunionstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sunionstore(...args: any[]): boolean;
        sunionstoreAsync<T>(...args: any[]): Promise<T>
        sdiff(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sdiff(...args: any[]): boolean;
        sdiffAsync<T>(...args: any[]): Promise<T>
        sdiffstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sdiffstore(...args: any[]): boolean;
        sdiffstoreAsync<T>(...args: any[]): Promise<T>
        smembers(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        smembers(...args: any[]): boolean;
        smembersAsync<T>(...args: any[]): Promise<string[]>
        zadd(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zadd(...args: any[]): boolean;
        zaddAsync<T>(...args: any[]): Promise<T>
        zincrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zincrby(...args: any[]): boolean;
        zincrbyAsync<T>(...args: any[]): Promise<T>
        zrem(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrem(...args: any[]): boolean;
        zremAsync<T>(...args: any[]): Promise<T>
        zremrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zremrangebyscore(...args: any[]): boolean;
        zremrangebyscoreAsync<T>(...args: any[]): Promise<T>
        zremrangebyrank(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zremrangebyrank(...args: any[]): boolean;
        zremrangebyrankAsync<T>(...args: any[]): Promise<T>
        zunionstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zunionstore(...args: any[]): boolean;
        zunionstoreAsync<T>(...args: any[]): Promise<T>
        zinterstore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zinterstore(...args: any[]): boolean;
        zinterstoreAsync<T>(...args: any[]): Promise<T>
        zrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrange(...args: any[]): boolean;
        zrangeAsync<T>(...args: any[]): Promise<T>
        zrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrangebyscore(...args: any[]): boolean;
        zrangebyscoreAsync<T>(...args: any[]): Promise<T>
        zrevrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrevrangebyscore(...args: any[]): boolean;
        zrevrangebyscoreAsync<T>(...args: any[]): Promise<T>
        zcount(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zcount(...args: any[]): boolean;
        zcountAsync<T>(...args: any[]): Promise<T>
        zrevrange(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrevrange(...args: any[]): boolean;
        zrevrangeAsync<T>(...args: any[]): Promise<T>
        zcard(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zcard(...args: any[]): boolean;
        zcardAsync<T>(...args: any[]): Promise<T>
        zscore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zscore(...args: any[]): boolean;
        zscoreAsync<T>(...args: any[]): Promise<T>
        zrank(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrank(...args: any[]): boolean;
        zrankAsync<T>(...args: any[]): Promise<T>
        zrevrank(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zrevrank(...args: any[]): boolean;
        zrevrankAsync<T>(...args: any[]): Promise<T>
        hset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hset(...args: any[]): boolean;
        hsetAsync<T>(...args: any[]): Promise<T>
        hsetnx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hsetnx(...args: any[]): boolean;
        hsetnxAsync<T>(...args: any[]): Promise<T>
        hget(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hget(...args: any[]): boolean;
        hgetAsync<T>(...args: any[]): Promise<T>
        hmset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hmset(key: string, hash: any, callback?: redis.ResCallbackT<any>): boolean;
        hmset(...args: any[]): boolean;
        hmsetAsync<T>(...args: any[]): Promise<T>
        hmget(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hmget(...args: any[]): boolean;
        hmgetAsync<T>(...args: any[]): Promise<T>
        hincrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hincrby(...args: any[]): boolean;
        hincrbyAsync<T>(...args: any[]): Promise<T>
        hdel(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hdel(...args: any[]): boolean;
        hdelAsync<T>(...args: any[]): Promise<T>
        hlen(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hlen(...args: any[]): boolean;
        hlenAsync<T>(...args: any[]): Promise<T>
        hkeys(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hkeys(...args: any[]): boolean;
        hkeysAsync<T>(...args: any[]): Promise<T>
        hvals(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hvals(...args: any[]): boolean;
        hvalsAsync<T>(...args: any[]): Promise<T>
        hgetall(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hgetall(...args: any[]): boolean;
        hgetallAsync<T>(...args: any[]): Promise<T>
        hgetall(key: string, callback?: redis.ResCallbackT<any>): boolean;
        hexists(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hexists(...args: any[]): boolean;
        hexistsAsync<T>(...args: any[]): Promise<T>
        incrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        incrby(...args: any[]): boolean;
        incrbyAsync<T>(...args: any[]): Promise<T>
        decrby(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        decrby(...args: any[]): boolean;
        decrbyAsync<T>(...args: any[]): Promise<T>
        getset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        getset(...args: any[]): boolean;
        getsetAsync<T>(...args: any[]): Promise<T>
        mset(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        mset(...args: any[]): boolean;
        msetAsync<T>(...args: any[]): Promise<T>
        msetnx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        msetnx(...args: any[]): boolean;
        msetnxAsync<T>(...args: any[]): Promise<T>
        randomkey(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        randomkey(...args: any[]): boolean;
        randomkeyAsync<T>(...args: any[]): Promise<T>
        select(args: any[], callback?: redis.ResCallbackT<any>): void;
        select(...args: any[]): void;
        selectAsync<T>(...args: any[]): Promise<T>
        move(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        move(...args: any[]): boolean;
        moveAsync<T>(...args: any[]): Promise<T>
        rename(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        rename(...args: any[]): boolean;
        renameAsync<T>(...args: any[]): Promise<T>
        renamenx(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        renamenx(...args: any[]): boolean;
        renamenxAsync<T>(...args: any[]): Promise<T>
        expire(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        expire(...args: any[]): boolean;
        expireAsync<T>(...args: any[]): Promise<T>
        expireat(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        expireat(...args: any[]): boolean;
        expireatAsync<T>(...args: any[]): Promise<T>
        keys(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        keys(...args: any[]): boolean;
        keysAsync<T>(...args: any[]): Promise<T>
        dbsize(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        dbsize(...args: any[]): boolean;
        dbsizeAsync<T>(...args: any[]): Promise<T>
        auth(args: any[], callback?: redis.ResCallbackT<any>): void;
        auth(...args: any[]): void;
        authAsync<T>(...args: any[]): Promise<T>
        ping(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        ping(...args: any[]): boolean;
        pingAsync<T>(...args: any[]): Promise<T>
        echo(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        echo(...args: any[]): boolean;
        echoAsync<T>(...args: any[]): Promise<T>
        save(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        save(...args: any[]): boolean;
        saveAsync<T>(...args: any[]): Promise<T>
        bgsave(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        bgsave(...args: any[]): boolean;
        bgsaveAsync<T>(...args: any[]): Promise<T>
        bgrewriteaof(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        bgrewriteaof(...args: any[]): boolean;
        bgrewriteaofAsync<T>(...args: any[]): Promise<T>
        shutdown(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        shutdown(...args: any[]): boolean;
        shutdownAsync<T>(...args: any[]): Promise<T>
        lastsave(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        lastsave(...args: any[]): boolean;
        lastsaveAsync<T>(...args: any[]): Promise<T>
        type(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        type(...args: any[]): boolean;
        typeAsync<T>(...args: any[]): Promise<T>
        multi(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        multi(...args: any[]): Multi;
        multiAsync<T>(...args: any[]): Promise<T>
        exec(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        exec(...args: any[]): boolean;
        execAsync<T>(...args: any[]): Promise<T>
        discard(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        discard(...args: any[]): boolean;
        discardAsync<T>(...args: any[]): Promise<T>
        sync(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sync(...args: any[]): boolean;
        syncAsync<T>(...args: any[]): Promise<T>
        flushdb(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        flushdb(...args: any[]): boolean;
        flushdbAsync<T>(...args: any[]): Promise<T>
        flushall(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        flushall(...args: any[]): boolean;
        flushallAsync<T>(...args: any[]): Promise<T>
        sort(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        sort(...args: any[]): boolean;
        sortAsync<T>(...args: any[]): Promise<T>
        info(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        info(...args: any[]): boolean;
        infoAsync<T>(...args: any[]): Promise<T>
        monitor(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        monitor(...args: any[]): boolean;
        monitorAsync<T>(...args: any[]): Promise<T>
        ttl(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        ttl(...args: any[]): boolean;
        ttlAsync<T>(...args: any[]): Promise<T>
        persist(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        persist(...args: any[]): boolean;
        persistAsync<T>(...args: any[]): Promise<T>
        slaveof(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        slaveof(...args: any[]): boolean;
        slaveofAsync<T>(...args: any[]): Promise<T>
        debug(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        debug(...args: any[]): boolean;
        debugAsync<T>(...args: any[]): Promise<T>
        config(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        config(...args: any[]): boolean;
        configAsync<T>(...args: any[]): Promise<T>
        subscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        subscribe(...args: any[]): boolean;
        subscribeAsync<T>(...args: any[]): Promise<T>
        unsubscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        unsubscribe(...args: any[]): boolean;
        unsubscribeAsync<T>(...args: any[]): Promise<T>
        psubscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        psubscribe(...args: any[]): boolean;
        psubscribeAsync<T>(...args: any[]): Promise<T>
        punsubscribe(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        punsubscribe(...args: any[]): boolean;
        punsubscribeAsync<T>(...args: any[]): Promise<T>
        publish(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        publish(...args: any[]): boolean;
        publishAsync<T>(...args: any[]): Promise<T>
        watch(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        watch(...args: any[]): boolean;
        watchAsync<T>(...args: any[]): Promise<T>
        unwatch(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        unwatch(...args: any[]): boolean;
        unwatchAsync<T>(...args: any[]): Promise<T>
        cluster(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        cluster(...args: any[]): boolean;
        clusterAsync<T>(...args: any[]): Promise<T>
        restore(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        restore(...args: any[]): boolean;
        restoreAsync<T>(...args: any[]): Promise<T>
        migrate(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        migrate(...args: any[]): boolean;
        migrateAsync<T>(...args: any[]): Promise<T>
        dump(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        dump(...args: any[]): boolean;
        dumpAsync<T>(...args: any[]): Promise<T>
        object(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        object(...args: any[]): boolean;
        objectAsync<T>(...args: any[]): Promise<T>
        client(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        client(...args: any[]): boolean;
        clientAsync<T>(...args: any[]): Promise<T>
        eval(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        eval(...args: any[]): boolean;
        evalAsync<T>(...args: any[]): Promise<T>
        evalsha(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        evalsha(...args: any[]): boolean;
        evalshaAsync<T>(...args: any[]): Promise<T>
        script(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        script(...args: any[]): boolean;
        scriptAsync<T>(...args: any[]): Promise<T>
        script(key: string, callback?: redis.ResCallbackT<any>): boolean;
        quit(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        quit(...args: any[]): boolean;
        quitAsync<T>(...args: any[]): Promise<T>
        scan(...args: any[]): boolean;
        scanAsync<T>(...args: any[]): Promise<T>
        scan(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        hscan(...args: any[]): boolean;
        hscanAsync<T>(...args: any[]): Promise<T>
        hscan(args: any[], callback?: redis.ResCallbackT<any>): boolean;
        zscan(...args: any[]): boolean;
        zscanAsync<T>(...args: any[]): Promise<T>
        zscan(args: any[], callback?: redis.ResCallbackT<any>): boolean;
    }

    export interface Multi {
        exec(callback?: redis.ResCallbackT<any[]>): boolean;

        get(args: any[], callback?: redis.ResCallbackT<string>): Multi;
        get(...args: any[]): Multi;
        getAsync<T>(...args: any[]): Promise<T>
        set(args: any[], callback?: redis.ResCallbackT<string>): Multi;
        set(...args: any[]): Multi;
        setAsync<T>(...args: any[]): Promise<T>
        setnx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        setnx(...args: any[]): Multi;
        setnxAsync<T>(...args: any[]): Promise<T>
        setex(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        setex(...args: any[]): Multi;
        setexAsync<T>(...args: any[]): Promise<T>
        append(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        append(...args: any[]): Multi;
        appendAsync<T>(...args: any[]): Promise<T>
        strlen(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        strlen(...args: any[]): Multi;
        strlenAsync<T>(...args: any[]): Promise<T>
        del(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        del(...args: any[]): Multi;
        delAsync<T>(...args: any[]): Promise<T>
        exists(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        exists(...args: any[]): Multi;
        existsAsync<T>(...args: any[]): Promise<T>
        setbit(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        setbit(...args: any[]): Multi;
        setbitAsync<T>(...args: any[]): Promise<T>
        getbit(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        getbit(...args: any[]): Multi;
        getbitAsync<T>(...args: any[]): Promise<T>
        setrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        setrange(...args: any[]): Multi;
        setrangeAsync<T>(...args: any[]): Promise<T>
        getrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        getrange(...args: any[]): Multi;
        getrangeAsync<T>(...args: any[]): Promise<T>
        substr(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        substr(...args: any[]): Multi;
        substrAsync<T>(...args: any[]): Promise<T>
        incr(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        incr(...args: any[]): Multi;
        incrAsync<T>(...args: any[]): Promise<T>
        decr(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        decr(...args: any[]): Multi;
        decrAsync<T>(...args: any[]): Promise<T>
        mget(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        mget(...args: any[]): Multi;
        mgetAsync<T>(...args: any[]): Promise<T>
        rpush(...args: any[]): Multi;
        rpushAsync<T>(...args: any[]): Promise<T>
        lpush(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lpush(...args: any[]): Multi;
        lpushAsync<T>(...args: any[]): Promise<T>
        rpushx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        rpushx(...args: any[]): Multi;
        rpushxAsync<T>(...args: any[]): Promise<T>
        lpushx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lpushx(...args: any[]): Multi;
        lpushxAsync<T>(...args: any[]): Promise<T>
        linsert(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        linsert(...args: any[]): Multi;
        linsertAsync<T>(...args: any[]): Promise<T>
        rpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        rpop(...args: any[]): Multi;
        rpopAsync<T>(...args: any[]): Promise<T>
        lpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lpop(...args: any[]): Multi;
        lpopAsync<T>(...args: any[]): Promise<T>
        brpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        brpop(...args: any[]): Multi;
        brpopAsync<T>(...args: any[]): Promise<T>
        brpoplpush(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        brpoplpush(...args: any[]): Multi;
        brpoplpushAsync<T>(...args: any[]): Promise<T>
        blpop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        blpop(...args: any[]): Multi;
        blpopAsync<T>(...args: any[]): Promise<T>
        llen(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        llen(...args: any[]): Multi;
        llenAsync<T>(...args: any[]): Promise<T>
        lindex(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lindex(...args: any[]): Multi;
        lindexAsync<T>(...args: any[]): Promise<T>
        lset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lset(...args: any[]): Multi;
        lsetAsync<T>(...args: any[]): Promise<T>
        lrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lrange(...args: any[]): Multi;
        lrangeAsync<T>(...args: any[]): Promise<T>
        ltrim(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        ltrim(...args: any[]): Multi;
        ltrimAsync<T>(...args: any[]): Promise<T>
        lrem(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lrem(...args: any[]): Multi;
        lremAsync<T>(...args: any[]): Promise<T>
        rpoplpush(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        rpoplpush(...args: any[]): Multi;
        rpoplpushAsync<T>(...args: any[]): Promise<T>
        sadd(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sadd(...args: any[]): Multi;
        saddAsync<T>(...args: any[]): Promise<T>
        srem(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        srem(...args: any[]): Multi;
        sremAsync<T>(...args: any[]): Promise<T>
        smove(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        smove(...args: any[]): Multi;
        smoveAsync<T>(...args: any[]): Promise<T>
        sismember(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sismember(...args: any[]): Multi;
        sismemberAsync<T>(...args: any[]): Promise<T>
        scard(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        scard(...args: any[]): Multi;
        scardAsync<T>(...args: any[]): Promise<T>
        spop(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        spop(...args: any[]): Multi;
        spopAsync<T>(...args: any[]): Promise<T>
        srandmember(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        srandmember(...args: any[]): Multi;
        srandmemberAsync<T>(...args: any[]): Promise<T>
        sinter(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sinter(...args: any[]): Multi;
        sinterAsync<T>(...args: any[]): Promise<T>
        sinterstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sinterstore(...args: any[]): Multi;
        sinterstoreAsync<T>(...args: any[]): Promise<T>
        sunion(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sunion(...args: any[]): Multi;
        sunionAsync<T>(...args: any[]): Promise<T>
        sunionstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sunionstore(...args: any[]): Multi;
        sunionstoreAsync<T>(...args: any[]): Promise<T>
        sdiff(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sdiff(...args: any[]): Multi;
        sdiffAsync<T>(...args: any[]): Promise<T>
        sdiffstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sdiffstore(...args: any[]): Multi;
        sdiffstoreAsync<T>(...args: any[]): Promise<T>
        smembers(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        smembers(...args: any[]): Multi;
        smembersAsync<T>(...args: any[]): Promise<T>
        zadd(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zadd(...args: any[]): Multi;
        zaddAsync<T>(...args: any[]): Promise<T>
        zincrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zincrby(...args: any[]): Multi;
        zincrbyAsync<T>(...args: any[]): Promise<T>
        zrem(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrem(...args: any[]): Multi;
        zremAsync<T>(...args: any[]): Promise<T>
        zremrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zremrangebyscore(...args: any[]): Multi;
        zremrangebyscoreAsync<T>(...args: any[]): Promise<T>
        zremrangebyrank(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zremrangebyrank(...args: any[]): Multi;
        zremrangebyrankAsync<T>(...args: any[]): Promise<T>
        zunionstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zunionstore(...args: any[]): Multi;
        zunionstoreAsync<T>(...args: any[]): Promise<T>
        zinterstore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zinterstore(...args: any[]): Multi;
        zinterstoreAsync<T>(...args: any[]): Promise<T>
        zrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrange(...args: any[]): Multi;
        zrangeAsync<T>(...args: any[]): Promise<T>
        zrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrangebyscore(...args: any[]): Multi;
        zrangebyscoreAsync<T>(...args: any[]): Promise<T>
        zrevrangebyscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrevrangebyscore(...args: any[]): Multi;
        zrevrangebyscoreAsync<T>(...args: any[]): Promise<T>
        zcount(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zcount(...args: any[]): Multi;
        zcountAsync<T>(...args: any[]): Promise<T>
        zrevrange(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrevrange(...args: any[]): Multi;
        zrevrangeAsync<T>(...args: any[]): Promise<T>
        zcard(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zcard(...args: any[]): Multi;
        zcardAsync<T>(...args: any[]): Promise<T>
        zscore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zscore(...args: any[]): Multi;
        zscoreAsync<T>(...args: any[]): Promise<T>
        zrank(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrank(...args: any[]): Multi;
        zrankAsync<T>(...args: any[]): Promise<T>
        zrevrank(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zrevrank(...args: any[]): Multi;
        zrevrankAsync<T>(...args: any[]): Promise<T>
        hset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hset(...args: any[]): Multi;
        hsetAsync<T>(...args: any[]): Promise<T>
        hsetnx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hsetnx(...args: any[]): Multi;
        hsetnxAsync<T>(...args: any[]): Promise<T>
        hget(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hget(...args: any[]): Multi;
        hgetAsync<T>(...args: any[]): Promise<T>
        hmset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hmset(key: string, hash: any, callback?: redis.ResCallbackT<any>): Multi;
        hmset(...args: any[]): Multi;
        hmsetAsync<T>(...args: any[]): Promise<T>
        hmget(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hmget(...args: any[]): Multi;
        hmgetAsync<T>(...args: any[]): Promise<T>
        hincrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hincrby(...args: any[]): Multi;
        hincrbyAsync<T>(...args: any[]): Promise<T>
        hdel(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hdel(...args: any[]): Multi;
        hdelAsync<T>(...args: any[]): Promise<T>
        hlen(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hlen(...args: any[]): Multi;
        hlenAsync<T>(...args: any[]): Promise<T>
        hkeys(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hkeys(...args: any[]): Multi;
        hkeysAsync<T>(...args: any[]): Promise<T>
        hvals(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hvals(...args: any[]): Multi;
        hvalsAsync<T>(...args: any[]): Promise<T>
        hgetall(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hgetall(...args: any[]): Multi;
        hgetallAsync<T>(...args: any[]): Promise<T>
        hgetall(key: string, callback?: redis.ResCallbackT<any>): Multi;
        hexists(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hexists(...args: any[]): Multi;
        hexistsAsync<T>(...args: any[]): Promise<T>
        incrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        incrby(...args: any[]): Multi;
        incrbyAsync<T>(...args: any[]): Promise<T>
        decrby(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        decrby(...args: any[]): Multi;
        decrbyAsync<T>(...args: any[]): Promise<T>
        getset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        getset(...args: any[]): Multi;
        getsetAsync<T>(...args: any[]): Promise<T>
        mset(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        mset(...args: any[]): Multi;
        msetAsync<T>(...args: any[]): Promise<T>
        msetnx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        msetnx(...args: any[]): Multi;
        msetnxAsync<T>(...args: any[]): Promise<T>
        randomkey(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        randomkey(...args: any[]): Multi;
        randomkeyAsync<T>(...args: any[]): Promise<T>
        select(args: any[], callback?: redis.ResCallbackT<any>): void;
        select(...args: any[]): Multi;
        selectAsync<T>(...args: any[]): Promise<T>
        move(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        move(...args: any[]): Multi;
        moveAsync<T>(...args: any[]): Promise<T>
        rename(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        rename(...args: any[]): Multi;
        renameAsync<T>(...args: any[]): Promise<T>
        renamenx(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        renamenx(...args: any[]): Multi;
        renamenxAsync<T>(...args: any[]): Promise<T>
        expire(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        expire(...args: any[]): Multi;
        expireAsync<T>(...args: any[]): Promise<T>
        expireat(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        expireat(...args: any[]): Multi;
        expireatAsync<T>(...args: any[]): Promise<T>
        keys(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        keys(...args: any[]): Multi;
        keysAsync<T>(...args: any[]): Promise<T>
        dbsize(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        dbsize(...args: any[]): Multi;
        dbsizeAsync<T>(...args: any[]): Promise<T>
        auth(args: any[], callback?: redis.ResCallbackT<any>): void;
        auth(...args: any[]): void;
        authAsync<T>(...args: any[]): Promise<T>
        ping(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        ping(...args: any[]): Multi;
        pingAsync<T>(...args: any[]): Promise<T>
        echo(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        echo(...args: any[]): Multi;
        echoAsync<T>(...args: any[]): Promise<T>
        save(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        save(...args: any[]): Multi;
        saveAsync<T>(...args: any[]): Promise<T>
        bgsave(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        bgsave(...args: any[]): Multi;
        bgsaveAsync<T>(...args: any[]): Promise<T>
        bgrewriteaof(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        bgrewriteaof(...args: any[]): Multi;
        bgrewriteaofAsync<T>(...args: any[]): Promise<T>
        shutdown(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        shutdown(...args: any[]): Multi;
        shutdownAsync<T>(...args: any[]): Promise<T>
        lastsave(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        lastsave(...args: any[]): Multi;
        lastsaveAsync<T>(...args: any[]): Promise<T>
        type(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        type(...args: any[]): Multi;
        typeAsync<T>(...args: any[]): Promise<T>
        multi(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        multi(...args: any[]): Multi;
        multiAsync<T>(...args: any[]): Promise<T>
        exec(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        exec(...args: any[]): Multi;
        execAsync<T>(...args: any[]): Promise<T>
        discard(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        discard(...args: any[]): Multi;
        discardAsync<T>(...args: any[]): Promise<T>
        sync(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sync(...args: any[]): Multi;
        syncAsync<T>(...args: any[]): Promise<T>
        flushdb(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        flushdb(...args: any[]): Multi;
        flushdbAsync<T>(...args: any[]): Promise<T>
        flushall(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        flushall(...args: any[]): Multi;
        flushallAsync<T>(...args: any[]): Promise<T>
        sort(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        sort(...args: any[]): Multi;
        sortAsync<T>(...args: any[]): Promise<T>
        info(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        info(...args: any[]): Multi;
        infoAsync<T>(...args: any[]): Promise<T>
        monitor(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        monitor(...args: any[]): Multi;
        monitorAsync<T>(...args: any[]): Promise<T>
        ttl(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        ttl(...args: any[]): Multi;
        ttlAsync<T>(...args: any[]): Promise<T>
        persist(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        persist(...args: any[]): Multi;
        persistAsync<T>(...args: any[]): Promise<T>
        slaveof(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        slaveof(...args: any[]): Multi;
        slaveofAsync<T>(...args: any[]): Promise<T>
        debug(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        debug(...args: any[]): Multi;
        debugAsync<T>(...args: any[]): Promise<T>
        config(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        config(...args: any[]): Multi;
        configAsync<T>(...args: any[]): Promise<T>
        subscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        subscribe(...args: any[]): Multi;
        subscribeAsync<T>(...args: any[]): Promise<T>
        unsubscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        unsubscribe(...args: any[]): Multi;
        unsubscribeAsync<T>(...args: any[]): Promise<T>
        psubscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        psubscribe(...args: any[]): Multi;
        psubscribeAsync<T>(...args: any[]): Promise<T>
        punsubscribe(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        punsubscribe(...args: any[]): Multi;
        punsubscribeAsync<T>(...args: any[]): Promise<T>
        publish(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        publish(...args: any[]): Multi;
        publishAsync<T>(...args: any[]): Promise<T>
        watch(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        watch(...args: any[]): Multi;
        watchAsync<T>(...args: any[]): Promise<T>
        unwatch(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        unwatch(...args: any[]): Multi;
        unwatchAsync<T>(...args: any[]): Promise<T>
        cluster(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        cluster(...args: any[]): Multi;
        clusterAsync<T>(...args: any[]): Promise<T>
        restore(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        restore(...args: any[]): Multi;
        restoreAsync<T>(...args: any[]): Promise<T>
        migrate(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        migrate(...args: any[]): Multi;
        migrateAsync<T>(...args: any[]): Promise<T>
        dump(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        dump(...args: any[]): Multi;
        dumpAsync<T>(...args: any[]): Promise<T>
        object(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        object(...args: any[]): Multi;
        objectAsync<T>(...args: any[]): Promise<T>
        client(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        client(...args: any[]): Multi;
        clientAsync<T>(...args: any[]): Promise<T>
        eval(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        eval(...args: any[]): Multi;
        evalAsync<T>(...args: any[]): Promise<T>
        evalsha(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        evalsha(...args: any[]): Multi;
        evalshaAsync<T>(...args: any[]): Promise<T>
        quit(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        quit(...args: any[]): Multi;
        quitAsync<T>(...args: any[]): Promise<T>
        scan(...args: any[]): Multi;
        scanAsync<T>(...args: any[]): Promise<T>
        scan(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        hscan(...args: any[]): Multi;
        hscanAsync<T>(...args: any[]): Promise<T>
        hscan(args: any[], callback?: redis.ResCallbackT<any>): Multi;
        zscan(...args: any[]): Multi;
        zscanAsync<T>(...args: any[]): Promise<T>
        zscan(args: any[], callback?: redis.ResCallbackT<any>): Multi;
    }

    export interface RedisStatic {
        debug_mode: boolean;

        createClient(port_arg: number, host_arg?: string, options?: redis.ClientOpts): RedisClient;
        createClient(unix_socket: string, options?: redis.ClientOpts): RedisClient;
        createClient(options?: redis.ClientOpts): RedisClient;

        print(err: Error, reply: any): void;
    }
}
