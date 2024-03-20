import Link from "next/link"
import {i18n_greeting, i18n_in_you_profile} from "i18n"
import * as T from "../data/type"

type CustomerGreetingProps = {
    customer: T.TCustomer,
    linkToProfile: string
}

export function CustomerGreeting({customer, linkToProfile}: CustomerGreetingProps){
    return (
        <div className="text-sm">
            {i18n_greeting
                .replace("{firstName}", customer.firstName)
                .replace("{lastName}", customer.lastName) } 
                <Link className="transition-all hover:text-primary underline" href={linkToProfile}>{i18n_in_you_profile}</Link>
        </div>
    );
}