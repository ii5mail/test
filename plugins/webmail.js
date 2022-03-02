import Vue from "vue"
import { webmails } from "@/components/registration/reg1/utils"

Vue.prototype.$is_webmail = value => {

    if (!value) {
        return false
    }
    let is_webmail = false
    webmails.forEach((domain) => {
        if (value.includes(domain)) {
            is_webmail = true
        }
    })

    return is_webmail
}
