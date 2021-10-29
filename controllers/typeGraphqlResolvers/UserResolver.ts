import jwt from "jsonwebtoken";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Users } from "../../models/typeormEnt/v1/User";
import {
  createAccessToken,
  verifyPassword,
} from "../../utils/ts/PasswordManager";
@InputType()
class EmailPasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class Token {
  @Field()
  access_token: string;

  @Field()
  expires_in: string;
}
@ObjectType()
class UserAuth {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  token: Token;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserAuth, { nullable: true })
  user?: UserAuth;
}

@Resolver()
export class UserResolver {
  @Query(() => [Users])
  user() {
    return Users.find();
  }

  @Mutation(() => UserResponse)
  async login(@Arg("options") options: EmailPasswordInput) {
    const user = await Users.findOne({ email: options.email });
    const { isValid } = await verifyPassword(options.password, user);
    if (isValid != true) {
      return {
        errors: [
          {
            field: "email",
            message: "Somthing went wrong",
          },
        ],
      };
    } else {
      const accesstoken = createAccessToken(user);
      return {
        user: {
          name: user.name,
          email: user.email,
          token: {
            access_token: accesstoken,
            expires_in: (jwt.decode(accesstoken) as any).exp,
          },
        },
      };
      // return res
      //   .cookie("token", accesstoken, {
      //     // expires: new Date(Date.now() + expiration),
      //     secure: false, // set to true if your using https
      //     httpOnly: true,
      //   })
      //   .status(200)
      //   .json({
      //     // "userId": result.userId,
      //     name: user.name,
      //     email: user.email,
      //     token: {
      //       access_token: accesstoken,
      //       expires_in: jwt.decode(accesstoken).exp,
      //       token_type: "bearer",
      //     },
      //   });
    }
  }
}
