import { MikroORM } from "@mikro-orm/core"
import { User } from "./entities/User";

import config from "./mikro-orm.config";

const main = async () => {
    // console.log(microConfig)
    const orm = await MikroORM.init(config);

    const user = orm.em.create(User, { email: 'cooper.smith9863@gmail.com', password: "Qwerty1" })
    await orm.em.persistAndFlush(user)
}

main().catch((err) => {
    console.error(err)
});