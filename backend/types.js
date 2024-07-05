const zod = require("zod")

const userSchema = zod.object({
    username:zod.string().email().min(3,"minimum length should be more than 3")
    .max(50, "max length should be less than 50")
    .refine(value => value === value.toLowerCase(), {message: "String must be in lowercase"}),
    firstName:zod.string().mix(50, "max length should be less than 50"),
    lastName:zod.string().mix(50, "max length should be less than 50"),
    password:zod.string().min(3,"minimum length should be more than 3").mix(50, "max length should be less than 50")
})

const updateSchema = zod.object({
    firstName:zod.string().mix(50, "max length should be less than 50"),
    lastName:zod.string().mix(50, "max length should be less than 50"),
    password:zod.string().min(3,"minimum length should be more than 3").mix(50, "max length should be less than 50")
})

module.exports = {
    userSchema,
    updateSchema
}