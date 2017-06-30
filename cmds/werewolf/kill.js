module.exports = {
    usage: "`<cmd> [Nom du role] [Identifiant joueur]` : " + __("Enlève le rôle `%s`, rajoute le rôle `%s` et renomme l'utilisateur.", [
        Config.options.modules.lg.roles.alive, Config.options.modules.lg.roles.alive
    ]),

    exec: function (msg, values) {
        try {
            var cnf = Config.options.modules.lg
            if (values[1] && values[2]) {
                var gm = Do.resolve("user", values[2])
                var rp = values[1]

                var vivant = Do.resolve("role", cnf.roles.alive)
                var mort = Do.resolve("role", cnf.roles.dead)

                gm.removeRole(vivant).then(ngm=>{
                    setTimeout(function () {
                        ngm.addRole(mort).catch(throwErr)
                    }, 500);
                }).catch(throwErr)
                gm.setNickname("💀" + rp.slice(0,10) + "|" + gm.user.username.slice(0,14)).catch(throwErr)

                msg.channel.send({embed: embMsg(`***${gm} a été tué(e) ... il/elle était : ${rp}***`).setColor("#111111")})
            } else {
                if (!values[1]) msg.channel.send({
                    embed: embErr(":x: Le nom du personnage mort n'est pas spécifié.")
                }).catch(throwErr)
                if (!values[2]) msg.channel.send({
                    embed: embErr(":x: Le joueur et/ou son personnage ne sont pas spécifiés.")
                }).catch(throwErr)
            }
        } catch(e) {
            throwErr(e)
        }
        return true
    }
};
