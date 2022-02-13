import React from "react";

export const defaultData = {
    user1: {
        name: "Demet Ozogul",
        age: 40
    },
    user2: {
        name: "X Y",
        age: 35
    }
}

export const Context = React.createContext( defaultData.user1 )