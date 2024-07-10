import zod from "zod"

export const signupSchema = zod.object({
    username:zod.string().email().min(3,"minimum length should be more than 3")
    .max(50, "max length should be less than 50")
    .refine(value => value === value.toLowerCase(), {message: "String must be in lowercase"}),
    firstName:zod.string().max(50, "max length should be less than 50"),
    lastName:zod.string().max(50, "max length should be less than 50"),
    password:zod.string().min(3,"minimum length should be more than 3").max(50, "max length should be less than 50")
})

export const signinSchema = zod.object({
    username:zod.string().email().min(3,"minimum length should be more than 3")
    .max(50, "max length should be less than 50")
    .refine(value => value === value.toLowerCase(), {message: "String must be in lowercase"}),
    password:zod.string().min(3,"minimum length should be more than 3").max(50, "max length should be less than 50")
})

export const updateSchema = zod.object({
    firstName:zod.string().max(50, "max length should be less than 50"),
    lastName:zod.string().max(50, "max length should be less than 50"),
    password:zod.string().min(3,"minimum length should be more than 3").max(50, "max length should be less than 50")
})

