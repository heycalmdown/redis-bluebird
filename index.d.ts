declare var redis:redis.RedisStatic;

declare namespace redis {
    interface ClientOpts {
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
        (err:Error, res:R): void;
    }

    interface ServerInfo {
        redis_version: string;
        versions: number[];
    }

    interface CommandT<R> { //This is a placeholder to be used eventually, to not have to define each command twice, or four times if all caps versions are to be implemented.
        (args:any[], callback?:redis.ResCallbackT<R>): void;
        (...args:any[]): void;
    }

    interface MessageHandler<M> {
        (channel:string, message:M): void;
    }
    
    interface RedisClient extends NodeJS.EventEmitter {
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
        send_command(command:string, ...args:any[]): boolean;

        // Connection (http://redis.io/commands#connection)
        auth(password:string, callback?:redis.ResCallbackT<any>): boolean;
        ping(callback?:redis.ResCallbackT<number>): boolean;

        // Strings (http://redis.io/commands#strings)
        append(key:string, value:string, callback?:redis.ResCallbackT<number>): boolean;
        bitcount(key:string, callback?:redis.ResCallbackT<number>): boolean;
        bitcount(key:string, start:number, end:number, callback?:redis.ResCallbackT<number>): boolean;
        set(key:string, value:string, callback?:redis.ResCallbackT<string>): boolean;
        get(key:string, callback?:redis.ResCallbackT<string>): boolean;
        exists(key:string, value:string, callback?:redis.ResCallbackT<number>): boolean;

        publish(channel:string, value:any): boolean;
        subscribe(channel:string): boolean;

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

        get(args:any[], callback?:redis.ResCallbackT<string>): boolean;
        get(...args:any[]): boolean;
        getAsync(...args:any[]): Promise<string>
        set(args:any[], callback?:redis.ResCallbackT<string>): boolean;
        set(...args:any[]): boolean;
        setAsync(...args:any[]): Promise<string>
        setnx(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        setnx(...args:any[]): boolean;
        setnxAsync(...args:any[]): Promise<string>
        setex(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        setex(...args:any[]): boolean;
        setexAsync(...args:any[]): Promise<string>
        append(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        append(...args:any[]): boolean;
        appendAsync(...args:any[]): Promise<string>
        strlen(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        strlen(...args:any[]): boolean;
        strlenAsync(...args:any[]): Promise<string>
        del(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        del(...args:any[]): boolean;
        delAsync(...args:any[]): Promise<string>
        exists(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        exists(...args:any[]): boolean;
        existsAsync(...args:any[]): Promise<string>
        setbit(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        setbit(...args:any[]): boolean;
        setbitAsync(...args:any[]): Promise<string>
        getbit(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        getbit(...args:any[]): boolean;
        getbitAsync(...args:any[]): Promise<string>
        setrange(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        setrange(...args:any[]): boolean;
        setrangeAsync(...args:any[]): Promise<string>
        getrange(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        getrange(...args:any[]): boolean;
        getrangeAsync(...args:any[]): Promise<string>
        substr(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        substr(...args:any[]): boolean;
        substrAsync(...args:any[]): Promise<string>
        incr(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        incr(...args:any[]): boolean;
        incrAsync(...args:any[]): Promise<string>
        decr(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        decr(...args:any[]): boolean;
        decrAsync(...args:any[]): Promise<string>
        mget(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        mget(...args:any[]): boolean;
        mgetAsync(...args:any[]): Promise<string[]>
        rpush(...args:any[]): boolean;
        rpushAsync(...args:any[]): Promise<string>
        lpush(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lpush(...args:any[]): boolean;
        lpushAsync(...args:any[]): Promise<string>
        rpushx(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        rpushx(...args:any[]): boolean;
        rpushxAsync(...args:any[]): Promise<string>
        lpushx(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lpushx(...args:any[]): boolean;
        lpushxAsync(...args:any[]): Promise<string>
        linsert(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        linsert(...args:any[]): boolean;
        linsertAsync(...args:any[]): Promise<string>
        rpop(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        rpop(...args:any[]): boolean;
        rpopAsync(...args:any[]): Promise<string>
        lpop(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lpop(...args:any[]): boolean;
        lpopAsync(...args:any[]): Promise<string>
        brpop(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        brpop(...args:any[]): boolean;
        brpopAsync(...args:any[]): Promise<string>
        brpoplpush(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        brpoplpush(...args:any[]): boolean;
        brpoplpushAsync(...args:any[]): Promise<string>
        blpop(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        blpop(...args:any[]): boolean;
        blpopAsync(...args:any[]): Promise<string>
        llen(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        llen(...args:any[]): boolean;
        llenAsync(...args:any[]): Promise<string>
        lindex(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lindex(...args:any[]): boolean;
        lindexAsync(...args:any[]): Promise<string>
        lset(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lset(...args:any[]): boolean;
        lsetAsync(...args:any[]): Promise<string>
        lrange(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lrange(...args:any[]): boolean;
        lrangeAsync(...args:any[]): Promise<string>
        ltrim(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        ltrim(...args:any[]): boolean;
        ltrimAsync(...args:any[]): Promise<string>
        lrem(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lrem(...args:any[]): boolean;
        lremAsync(...args:any[]): Promise<string>
        rpoplpush(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        rpoplpush(...args:any[]): boolean;
        rpoplpushAsync(...args:any[]): Promise<string>
        sadd(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sadd(...args:any[]): boolean;
        saddAsync(...args:any[]): Promise<string>
        srem(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        srem(...args:any[]): boolean;
        sremAsync(...args:any[]): Promise<string>
        smove(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        smove(...args:any[]): boolean;
        smoveAsync(...args:any[]): Promise<string>
        sismember(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sismember(...args:any[]): boolean;
        sismemberAsync(...args:any[]): Promise<string>
        scard(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        scard(...args:any[]): boolean;
        scardAsync(...args:any[]): Promise<string>
        spop(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        spop(...args:any[]): boolean;
        spopAsync(...args:any[]): Promise<string>
        srandmember(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        srandmember(...args:any[]): boolean;
        srandmemberAsync(...args:any[]): Promise<string>
        sinter(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sinter(...args:any[]): boolean;
        sinterAsync(...args:any[]): Promise<string>
        sinterstore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sinterstore(...args:any[]): boolean;
        sinterstoreAsync(...args:any[]): Promise<string>
        sunion(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sunion(...args:any[]): boolean;
        sunionAsync(...args:any[]): Promise<string>
        sunionstore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sunionstore(...args:any[]): boolean;
        sunionstoreAsync(...args:any[]): Promise<string>
        sdiff(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sdiff(...args:any[]): boolean;
        sdiffAsync(...args:any[]): Promise<string>
        sdiffstore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sdiffstore(...args:any[]): boolean;
        sdiffstoreAsync(...args:any[]): Promise<string>
        smembers(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        smembers(...args:any[]): boolean;
        smembersAsync(...args:any[]): Promise<string[]>
        zadd(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zadd(...args:any[]): boolean;
        zaddAsync(...args:any[]): Promise<string>
        zincrby(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zincrby(...args:any[]): boolean;
        zincrbyAsync(...args:any[]): Promise<string>
        zrem(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrem(...args:any[]): boolean;
        zremAsync(...args:any[]): Promise<string>
        zremrangebyscore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zremrangebyscore(...args:any[]): boolean;
        zremrangebyscoreAsync(...args:any[]): Promise<string>
        zremrangebyrank(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zremrangebyrank(...args:any[]): boolean;
        zremrangebyrankAsync(...args:any[]): Promise<string>
        zunionstore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zunionstore(...args:any[]): boolean;
        zunionstoreAsync(...args:any[]): Promise<string>
        zinterstore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zinterstore(...args:any[]): boolean;
        zinterstoreAsync(...args:any[]): Promise<string>
        zrange(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrange(...args:any[]): boolean;
        zrangeAsync(...args:any[]): Promise<string[]>
        zrangebyscore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrangebyscore(...args:any[]): boolean;
        zrangebyscoreAsync(...args:any[]): Promise<string[]>
        zrevrangebyscore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrevrangebyscore(...args:any[]): boolean;
        zrevrangebyscoreAsync(...args:any[]): Promise<string[]>
        zcount(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zcount(...args:any[]): boolean;
        zcountAsync(...args:any[]): Promise<string>
        zrevrange(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrevrange(...args:any[]): boolean;
        zrevrangeAsync(...args:any[]): Promise<string>
        zcard(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zcard(...args:any[]): boolean;
        zcardAsync(...args:any[]): Promise<string>
        zscore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zscore(...args:any[]): boolean;
        zscoreAsync(...args:any[]): Promise<string>
        zrank(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrank(...args:any[]): boolean;
        zrankAsync(...args:any[]): Promise<string>
        zrevrank(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zrevrank(...args:any[]): boolean;
        zrevrankAsync(...args:any[]): Promise<string>
        hset(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hset(...args:any[]): boolean;
        hsetAsync(...args:any[]): Promise<string>
        hsetnx(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hsetnx(...args:any[]): boolean;
        hsetnxAsync(...args:any[]): Promise<string>
        hget(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hget(...args:any[]): boolean;
        hgetAsync(...args:any[]): Promise<string>
        hmset(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hmset(key:string, hash:any, callback?:redis.ResCallbackT<any>): boolean;
        hmset(...args:any[]): boolean;
        hmsetAsync(...args:any[]): Promise<string>
        hmget(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hmget(...args:any[]): boolean;
        hmgetAsync(...args:any[]): Promise<string[]>
        hincrby(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hincrby(...args:any[]): boolean;
        hincrbyAsync(...args:any[]): Promise<string>
        hdel(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hdel(...args:any[]): boolean;
        hdelAsync(...args:any[]): Promise<string>
        hlen(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hlen(...args:any[]): boolean;
        hlenAsync(...args:any[]): Promise<string>
        hkeys(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hkeys(...args:any[]): boolean;
        hkeysAsync(...args:any[]): Promise<string[]>
        hvals(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hvals(...args:any[]): boolean;
        hvalsAsync(...args:any[]): Promise<string[]>
        hgetall(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hgetall(...args:any[]): boolean;
        hgetallAsync(...args:any[]): Promise<string[]>
        hgetall(key:string, callback?:redis.ResCallbackT<any>): boolean;
        hexists(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hexists(...args:any[]): boolean;
        hexistsAsync(...args:any[]): Promise<string>
        incrby(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        incrby(...args:any[]): boolean;
        incrbyAsync(...args:any[]): Promise<string>
        decrby(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        decrby(...args:any[]): boolean;
        decrbyAsync(...args:any[]): Promise<string>
        getset(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        getset(...args:any[]): boolean;
        getsetAsync(...args:any[]): Promise<string>
        mset(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        mset(...args:any[]): boolean;
        msetAsync(...args:any[]): Promise<string>
        msetnx(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        msetnx(...args:any[]): boolean;
        msetnxAsync(...args:any[]): Promise<string>
        randomkey(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        randomkey(...args:any[]): boolean;
        randomkeyAsync(...args:any[]): Promise<string>
        select(args:any[], callback?:redis.ResCallbackT<any>): void;
        select(...args:any[]): void;
        selectAsync(...args:any[]): Promise<string>
        move(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        move(...args:any[]): boolean;
        moveAsync(...args:any[]): Promise<string>
        rename(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        rename(...args:any[]): boolean;
        renameAsync(...args:any[]): Promise<string>
        renamenx(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        renamenx(...args:any[]): boolean;
        renamenxAsync(...args:any[]): Promise<string>
        expire(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        expire(...args:any[]): boolean;
        expireAsync(...args:any[]): Promise<string>
        expireat(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        expireat(...args:any[]): boolean;
        expireatAsync(...args:any[]): Promise<string>
        keys(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        keys(...args:any[]): boolean;
        keysAsync(...args:any[]): Promise<string>
        dbsize(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        dbsize(...args:any[]): boolean;
        dbsizeAsync(...args:any[]): Promise<string>
        auth(args:any[], callback?:redis.ResCallbackT<any>): void;
        auth(...args:any[]): void;
        authAsync(...args:any[]): Promise<string>
        ping(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        ping(...args:any[]): boolean;
        pingAsync(...args:any[]): Promise<string>
        echo(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        echo(...args:any[]): boolean;
        echoAsync(...args:any[]): Promise<string>
        save(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        save(...args:any[]): boolean;
        saveAsync(...args:any[]): Promise<string>
        bgsave(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        bgsave(...args:any[]): boolean;
        bgsaveAsync(...args:any[]): Promise<string>
        bgrewriteaof(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        bgrewriteaof(...args:any[]): boolean;
        bgrewriteaofAsync(...args:any[]): Promise<string>
        shutdown(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        shutdown(...args:any[]): boolean;
        shutdownAsync(...args:any[]): Promise<string>
        lastsave(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        lastsave(...args:any[]): boolean;
        lastsaveAsync(...args:any[]): Promise<string>
        type(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        type(...args:any[]): boolean;
        typeAsync(...args:any[]): Promise<string>
        multi(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        multi(...args:any[]): Multi;
        multiAsync(...args:any[]): Promise<string>
        exec(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        exec(...args:any[]): boolean;
        execAsync(...args:any[]): Promise<string>
        discard(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        discard(...args:any[]): boolean;
        discardAsync(...args:any[]): Promise<string>
        sync(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sync(...args:any[]): boolean;
        syncAsync(...args:any[]): Promise<string>
        flushdb(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        flushdb(...args:any[]): boolean;
        flushdbAsync(...args:any[]): Promise<string>
        flushall(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        flushall(...args:any[]): boolean;
        flushallAsync(...args:any[]): Promise<string>
        sort(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        sort(...args:any[]): boolean;
        sortAsync(...args:any[]): Promise<string>
        info(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        info(...args:any[]): boolean;
        infoAsync(...args:any[]): Promise<string>
        monitor(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        monitor(...args:any[]): boolean;
        monitorAsync(...args:any[]): Promise<string>
        ttl(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        ttl(...args:any[]): boolean;
        ttlAsync(...args:any[]): Promise<string>
        persist(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        persist(...args:any[]): boolean;
        persistAsync(...args:any[]): Promise<string>
        slaveof(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        slaveof(...args:any[]): boolean;
        slaveofAsync(...args:any[]): Promise<string>
        debug(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        debug(...args:any[]): boolean;
        debugAsync(...args:any[]): Promise<string>
        config(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        config(...args:any[]): boolean;
        configAsync(...args:any[]): Promise<string>
        subscribe(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        subscribe(...args:any[]): boolean;
        subscribeAsync(...args:any[]): Promise<string>
        unsubscribe(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        unsubscribe(...args:any[]): boolean;
        unsubscribeAsync(...args:any[]): Promise<string>
        psubscribe(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        psubscribe(...args:any[]): boolean;
        psubscribeAsync(...args:any[]): Promise<string>
        punsubscribe(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        punsubscribe(...args:any[]): boolean;
        punsubscribeAsync(...args:any[]): Promise<string>
        publish(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        publish(...args:any[]): boolean;
        publishAsync(...args:any[]): Promise<string>
        watch(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        watch(...args:any[]): boolean;
        watchAsync(...args:any[]): Promise<string>
        unwatch(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        unwatch(...args:any[]): boolean;
        unwatchAsync(...args:any[]): Promise<string>
        cluster(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        cluster(...args:any[]): boolean;
        clusterAsync(...args:any[]): Promise<string>
        restore(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        restore(...args:any[]): boolean;
        restoreAsync(...args:any[]): Promise<string>
        migrate(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        migrate(...args:any[]): boolean;
        migrateAsync(...args:any[]): Promise<string>
        dump(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        dump(...args:any[]): boolean;
        dumpAsync(...args:any[]): Promise<string>
        object(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        object(...args:any[]): boolean;
        objectAsync(...args:any[]): Promise<string>
        client(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        client(...args:any[]): boolean;
        clientAsync(...args:any[]): Promise<string>
        eval(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        eval(...args:any[]): boolean;
        evalAsync(...args:any[]): Promise<string>
        evalsha(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        evalsha(...args:any[]): boolean;
        evalshaAsync(...args:any[]): Promise<string>
        script(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        script(...args: any[]): boolean;
        scriptAsync(...args: any[]): Promise<string>
        script(key: string, callback?: redis.ResCallbackT<any>): boolean;
        quit(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        quit(...args:any[]): boolean;
        quitAsync(...args:any[]): Promise<string>
        scan(...args:any[]): boolean;
        scanAsync(...args:any[]): Promise<string>
        scan(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        hscan(...args:any[]): boolean;
        hscanAsync(...args:any[]): Promise<string>
        hscan(args:any[], callback?:redis.ResCallbackT<any>): boolean;
        zscan(...args:any[]): boolean;
        zscanAsync(...args:any[]): Promise<string>
        zscan(args:any[], callback?:redis.ResCallbackT<any>): boolean;
    }






    interface Multi {
        exec(callback?:redis.ResCallbackT<any[]>): boolean;

        get(args:any[], callback?:redis.ResCallbackT<string>): Multi;
        get(...args:any[]): Multi;
        getAsync(...args:any[]): Promise<string>
        set(args:any[], callback?:redis.ResCallbackT<string>): Multi;
        set(...args:any[]): Multi;
        setAsync(...args:any[]): Promise<string>
        setnx(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        setnx(...args:any[]): Multi;
        setnxAsync(...args:any[]): Promise<string>
        setex(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        setex(...args:any[]): Multi;
        setexAsync(...args:any[]): Promise<string>
        append(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        append(...args:any[]): Multi;
        appendAsync(...args:any[]): Promise<string>
        strlen(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        strlen(...args:any[]): Multi;
        strlenAsync(...args:any[]): Promise<string>
        del(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        del(...args:any[]): Multi;
        delAsync(...args:any[]): Promise<string>
        exists(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        exists(...args:any[]): Multi;
        existsAsync(...args:any[]): Promise<string>
        setbit(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        setbit(...args:any[]): Multi;
        setbitAsync(...args:any[]): Promise<string>
        getbit(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        getbit(...args:any[]): Multi;
        getbitAsync(...args:any[]): Promise<string>
        setrange(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        setrange(...args:any[]): Multi;
        setrangeAsync(...args:any[]): Promise<string>
        getrange(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        getrange(...args:any[]): Multi;
        getrangeAsync(...args:any[]): Promise<string>
        substr(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        substr(...args:any[]): Multi;
        substrAsync(...args:any[]): Promise<string>
        incr(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        incr(...args:any[]): Multi;
        incrAsync(...args:any[]): Promise<string>
        decr(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        decr(...args:any[]): Multi;
        decrAsync(...args:any[]): Promise<string>
        mget(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        mget(...args:any[]): Multi;
        mgetAsync(...args:any[]): Promise<string[]>
        rpush(...args:any[]): Multi;
        rpushAsync(...args:any[]): Promise<string>
        lpush(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lpush(...args:any[]): Multi;
        lpushAsync(...args:any[]): Promise<string>
        rpushx(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        rpushx(...args:any[]): Multi;
        rpushxAsync(...args:any[]): Promise<string>
        lpushx(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lpushx(...args:any[]): Multi;
        lpushxAsync(...args:any[]): Promise<string>
        linsert(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        linsert(...args:any[]): Multi;
        linsertAsync(...args:any[]): Promise<string>
        rpop(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        rpop(...args:any[]): Multi;
        rpopAsync(...args:any[]): Promise<string>
        lpop(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lpop(...args:any[]): Multi;
        lpopAsync(...args:any[]): Promise<string>
        brpop(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        brpop(...args:any[]): Multi;
        brpopAsync(...args:any[]): Promise<string>
        brpoplpush(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        brpoplpush(...args:any[]): Multi;
        brpoplpushAsync(...args:any[]): Promise<string>
        blpop(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        blpop(...args:any[]): Multi;
        blpopAsync(...args:any[]): Promise<string>
        llen(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        llen(...args:any[]): Multi;
        llenAsync(...args:any[]): Promise<string>
        lindex(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lindex(...args:any[]): Multi;
        lindexAsync(...args:any[]): Promise<string>
        lset(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lset(...args:any[]): Multi;
        lsetAsync(...args:any[]): Promise<string>
        lrange(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lrange(...args:any[]): Multi;
        lrangeAsync(...args:any[]): Promise<string>
        ltrim(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        ltrim(...args:any[]): Multi;
        ltrimAsync(...args:any[]): Promise<string>
        lrem(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lrem(...args:any[]): Multi;
        lremAsync(...args:any[]): Promise<string>
        rpoplpush(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        rpoplpush(...args:any[]): Multi;
        rpoplpushAsync(...args:any[]): Promise<string>
        sadd(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sadd(...args:any[]): Multi;
        saddAsync(...args:any[]): Promise<string>
        srem(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        srem(...args:any[]): Multi;
        sremAsync(...args:any[]): Promise<string>
        smove(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        smove(...args:any[]): Multi;
        smoveAsync(...args:any[]): Promise<string>
        sismember(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sismember(...args:any[]): Multi;
        sismemberAsync(...args:any[]): Promise<string>
        scard(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        scard(...args:any[]): Multi;
        scardAsync(...args:any[]): Promise<string>
        spop(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        spop(...args:any[]): Multi;
        spopAsync(...args:any[]): Promise<string>
        srandmember(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        srandmember(...args:any[]): Multi;
        srandmemberAsync(...args:any[]): Promise<string>
        sinter(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sinter(...args:any[]): Multi;
        sinterAsync(...args:any[]): Promise<string>
        sinterstore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sinterstore(...args:any[]): Multi;
        sinterstoreAsync(...args:any[]): Promise<string>
        sunion(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sunion(...args:any[]): Multi;
        sunionAsync(...args:any[]): Promise<string>
        sunionstore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sunionstore(...args:any[]): Multi;
        sunionstoreAsync(...args:any[]): Promise<string>
        sdiff(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sdiff(...args:any[]): Multi;
        sdiffAsync(...args:any[]): Promise<string>
        sdiffstore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sdiffstore(...args:any[]): Multi;
        sdiffstoreAsync(...args:any[]): Promise<string>
        smembers(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        smembers(...args:any[]): Multi;
        smembersAsync(...args:any[]): Promise<string[]>
        zadd(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zadd(...args:any[]): Multi;
        zaddAsync(...args:any[]): Promise<string>
        zincrby(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zincrby(...args:any[]): Multi;
        zincrbyAsync(...args:any[]): Promise<string>
        zrem(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrem(...args:any[]): Multi;
        zremAsync(...args:any[]): Promise<string>
        zremrangebyscore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zremrangebyscore(...args:any[]): Multi;
        zremrangebyscoreAsync(...args:any[]): Promise<string>
        zremrangebyrank(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zremrangebyrank(...args:any[]): Multi;
        zremrangebyrankAsync(...args:any[]): Promise<string>
        zunionstore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zunionstore(...args:any[]): Multi;
        zunionstoreAsync(...args:any[]): Promise<string>
        zinterstore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zinterstore(...args:any[]): Multi;
        zinterstoreAsync(...args:any[]): Promise<string>
        zrange(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrange(...args:any[]): Multi;
        zrangeAsync(...args:any[]): Promise<string[]>
        zrangebyscore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrangebyscore(...args:any[]): Multi;
        zrangebyscoreAsync(...args:any[]): Promise<string[]>
        zrevrangebyscore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrevrangebyscore(...args:any[]): Multi;
        zrevrangebyscoreAsync(...args:any[]): Promise<string[]>
        zcount(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zcount(...args:any[]): Multi;
        zcountAsync(...args:any[]): Promise<string>
        zrevrange(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrevrange(...args:any[]): Multi;
        zrevrangeAsync(...args:any[]): Promise<string[]>
        zcard(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zcard(...args:any[]): Multi;
        zcardAsync(...args:any[]): Promise<string>
        zscore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zscore(...args:any[]): Multi;
        zscoreAsync(...args:any[]): Promise<string>
        zrank(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrank(...args:any[]): Multi;
        zrankAsync(...args:any[]): Promise<string>
        zrevrank(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zrevrank(...args:any[]): Multi;
        zrevrankAsync(...args:any[]): Promise<string>
        hset(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hset(...args:any[]): Multi;
        hsetAsync(...args:any[]): Promise<string>
        hsetnx(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hsetnx(...args:any[]): Multi;
        hsetnxAsync(...args:any[]): Promise<string>
        hget(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hget(...args:any[]): Multi;
        hgetAsync(...args:any[]): Promise<string>
        hmset(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hmset(key:string, hash:any, callback?:redis.ResCallbackT<any>): Multi;
        hmset(...args:any[]): Multi;
        hmsetAsync(...args:any[]): Promise<string>
        hmget(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hmget(...args:any[]): Multi;
        hmgetAsync(...args:any[]): Promise<string[]>
        hincrby(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hincrby(...args:any[]): Multi;
        hincrbyAsync(...args:any[]): Promise<string>
        hdel(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hdel(...args:any[]): Multi;
        hdelAsync(...args:any[]): Promise<string>
        hlen(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hlen(...args:any[]): Multi;
        hlenAsync(...args:any[]): Promise<string>
        hkeys(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hkeys(...args:any[]): Multi;
        hkeysAsync(...args:any[]): Promise<string[]>
        hvals(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hvals(...args:any[]): Multi;
        hvalsAsync(...args:any[]): Promise<string[]>
        hgetall(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hgetall(...args:any[]): Multi;
        hgetallAsync(...args:any[]): Promise<string[]>
        hgetall(key:string, callback?:redis.ResCallbackT<any>): Multi;
        hexists(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hexists(...args:any[]): Multi;
        hexistsAsync(...args:any[]): Promise<string>
        incrby(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        incrby(...args:any[]): Multi;
        incrbyAsync(...args:any[]): Promise<string>
        decrby(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        decrby(...args:any[]): Multi;
        decrbyAsync(...args:any[]): Promise<string>
        getset(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        getset(...args:any[]): Multi;
        getsetAsync(...args:any[]): Promise<string>
        mset(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        mset(...args:any[]): Multi;
        msetAsync(...args:any[]): Promise<string>
        msetnx(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        msetnx(...args:any[]): Multi;
        msetnxAsync(...args:any[]): Promise<string>
        randomkey(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        randomkey(...args:any[]): Multi;
        randomkeyAsync(...args:any[]): Promise<string>
        select(args:any[], callback?:redis.ResCallbackT<any>): void;
        select(...args:any[]): Multi;
        selectAsync(...args:any[]): Promise<string>
        move(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        move(...args:any[]): Multi;
        moveAsync(...args:any[]): Promise<string>
        rename(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        rename(...args:any[]): Multi;
        renameAsync(...args:any[]): Promise<string>
        renamenx(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        renamenx(...args:any[]): Multi;
        renamenxAsync(...args:any[]): Promise<string>
        expire(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        expire(...args:any[]): Multi;
        expireAsync(...args:any[]): Promise<string>
        expireat(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        expireat(...args:any[]): Multi;
        expireatAsync(...args:any[]): Promise<string>
        keys(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        keys(...args:any[]): Multi;
        keysAsync(...args:any[]): Promise<string>
        dbsize(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        dbsize(...args:any[]): Multi;
        dbsizeAsync(...args:any[]): Promise<string>
        auth(args:any[], callback?:redis.ResCallbackT<any>): void;
        auth(...args:any[]): void;
        authAsync(...args:any[]): Promise<string>
        ping(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        ping(...args:any[]): Multi;
        pingAsync(...args:any[]): Promise<string>
        echo(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        echo(...args:any[]): Multi;
        echoAsync(...args:any[]): Promise<string>
        save(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        save(...args:any[]): Multi;
        saveAsync(...args:any[]): Promise<string>
        bgsave(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        bgsave(...args:any[]): Multi;
        bgsaveAsync(...args:any[]): Promise<string>
        bgrewriteaof(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        bgrewriteaof(...args:any[]): Multi;
        bgrewriteaofAsync(...args:any[]): Promise<string>
        shutdown(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        shutdown(...args:any[]): Multi;
        shutdownAsync(...args:any[]): Promise<string>
        lastsave(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        lastsave(...args:any[]): Multi;
        lastsaveAsync(...args:any[]): Promise<string>
        type(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        type(...args:any[]): Multi;
        typeAsync(...args:any[]): Promise<string>
        multi(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        multi(...args:any[]): Multi;
        multiAsync(...args:any[]): Promise<string>
        exec(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        exec(...args:any[]): Multi;
        execAsync(...args:any[]): Promise<string>
        discard(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        discard(...args:any[]): Multi;
        discardAsync(...args:any[]): Promise<string>
        sync(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sync(...args:any[]): Multi;
        syncAsync(...args:any[]): Promise<string>
        flushdb(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        flushdb(...args:any[]): Multi;
        flushdbAsync(...args:any[]): Promise<string>
        flushall(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        flushall(...args:any[]): Multi;
        flushallAsync(...args:any[]): Promise<string>
        sort(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        sort(...args:any[]): Multi;
        sortAsync(...args:any[]): Promise<string>
        info(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        info(...args:any[]): Multi;
        infoAsync(...args:any[]): Promise<string>
        monitor(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        monitor(...args:any[]): Multi;
        monitorAsync(...args:any[]): Promise<string>
        ttl(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        ttl(...args:any[]): Multi;
        ttlAsync(...args:any[]): Promise<string>
        persist(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        persist(...args:any[]): Multi;
        persistAsync(...args:any[]): Promise<string>
        slaveof(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        slaveof(...args:any[]): Multi;
        slaveofAsync(...args:any[]): Promise<string>
        debug(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        debug(...args:any[]): Multi;
        debugAsync(...args:any[]): Promise<string>
        config(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        config(...args:any[]): Multi;
        configAsync(...args:any[]): Promise<string>
        subscribe(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        subscribe(...args:any[]): Multi;
        subscribeAsync(...args:any[]): Promise<string>
        unsubscribe(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        unsubscribe(...args:any[]): Multi;
        unsubscribeAsync(...args:any[]): Promise<string>
        psubscribe(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        psubscribe(...args:any[]): Multi;
        psubscribeAsync(...args:any[]): Promise<string>
        punsubscribe(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        punsubscribe(...args:any[]): Multi;
        punsubscribeAsync(...args:any[]): Promise<string>
        publish(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        publish(...args:any[]): Multi;
        publishAsync(...args:any[]): Promise<string>
        watch(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        watch(...args:any[]): Multi;
        watchAsync(...args:any[]): Promise<string>
        unwatch(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        unwatch(...args:any[]): Multi;
        unwatchAsync(...args:any[]): Promise<string>
        cluster(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        cluster(...args:any[]): Multi;
        clusterAsync(...args:any[]): Promise<string>
        restore(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        restore(...args:any[]): Multi;
        restoreAsync(...args:any[]): Promise<string>
        migrate(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        migrate(...args:any[]): Multi;
        migrateAsync(...args:any[]): Promise<string>
        dump(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        dump(...args:any[]): Multi;
        dumpAsync(...args:any[]): Promise<string>
        object(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        object(...args:any[]): Multi;
        objectAsync(...args:any[]): Promise<string>
        client(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        client(...args:any[]): Multi;
        clientAsync(...args:any[]): Promise<string>
        eval(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        eval(...args:any[]): Multi;
        evalAsync(...args:any[]): Promise<string>
        evalsha(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        evalsha(...args:any[]): Multi;
        evalshaAsync(...args:any[]): Promise<string>
        quit(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        quit(...args:any[]): Multi;
        quitAsync(...args:any[]): Promise<string>
        scan(...args:any[]): Multi;
        scanAsync(...args:any[]): Promise<string>
        scan(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        hscan(...args:any[]): Multi;
        hscanAsync(...args:any[]): Promise<string>
        hscan(args:any[], callback?:redis.ResCallbackT<any>): Multi;
        zscan(...args:any[]): Multi;
        zscanAsync(...args:any[]): Promise<string>
        zscan(args:any[], callback?:redis.ResCallbackT<any>): Multi;
    }

    interface RedisStatic {
        debug_mode:boolean;

        createClient(port_arg:number, host_arg?:string, options?:redis.ClientOpts):RedisClient;
        createClient(unix_socket:string, options?:redis.ClientOpts):RedisClient;
        createClient(options?:redis.ClientOpts):RedisClient;

        print(err:Error, reply:any):void;
    }    
}

export = redis;
