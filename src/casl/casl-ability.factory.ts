import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Role } from "src/enums/role.enums";
type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
@Injectable()
export class CaslAbilityFactory {
    createForUser(user:User){
        const{can,cannot,build} =new AbilityBuilder<Ability<[Role, Subjects]>
        >(Ability as AbilityClass<Ability<[Role, Subjects]>>);

        if(user.isAdmin)
        {
            can (Role.Manage, 'all');
            }else{
                can (Role.Read, 'all');
            }
            can(Role.Update, Article ,{authorId:user.id});
            cannot(Role.Delete , Article,{ isPublished:true});

        return build({
            detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
        });
        }
    }
