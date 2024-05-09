"use server"


export async function getChatUser(user: any | string) {
    const res = await fetch(`https://chatdb.pockethost.io/api/collections/user/records/?filter=(userid_app='${user.id}')`,
        {
            method: "GET"
        })
    const data = await res.json()
    if (data.items.length > 0) {
        return data
    }
    // create a new user
    else {
        const res = await fetch(`https://chatdb.pockethost.io/api/collections/user/records`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid_app: user.id,
                    name: user.name,
                    email: "",
                }),
            })
        const data = await res.json()
        return data
    }
}