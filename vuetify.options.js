import APlusCircled from "~/components/ui/icons/APlusCircled"
import Architect from "~/components/ui/icons/Architect"
import ArrowRefresh from "~/components/ui/icons/ArrowRefresh"
import ArrowRotate from "~/components/ui/icons/ArrowRotate"
import ArrowLineDown from "~/components/ui/icons/ArrowLineDown"
import ArrowDown from "~/components/ui/icons/ArrowDown"
import Close from "~/components/ui/icons/Close"
import CloseSmall from "~/components/ui/icons/CloseSmall"
import Buildings from "~/components/ui/icons/Buildings"
import CheckmarkCircled from "~/components/ui/icons/CheckmarkCircled"
import ChevronDown from "~/components/ui/icons/ChevronDown"
import ChevronDownCircle from "~/components/ui/icons/ChevronDownCircle"
import ChevronUp from "~/components/ui/icons/ChevronUp"
import ChevronLeft from "~/components/ui/icons/ChevronLeft"
import ChevronRight from "~/components/ui/icons/ChevronRight"
import ChevronDownSmall from "~/components/ui/icons/ChevronDownSmall"
import ChevronUpSmall from "~/components/ui/icons/ChevronUpSmall"
import ChevronLeftSmall from "~/components/ui/icons/ChevronLeftSmall"
import ChevronRightSmall from "~/components/ui/icons/ChevronRightSmall"
import Envelope from "~/components/ui/icons/Envelope"
import Flag from "~/components/ui/icons/Flag"
import GeneralContractor from "~/components/ui/icons/GeneralContractor"
import Hammer from "~/components/ui/icons/Hammer"
import HouseIcon from "~/components/ui/icons/House"
import Info from "~/components/ui/icons/Info"
import Linkage from "~/components/ui/icons/Linkage"
import Location from "~/components/ui/icons/Location"
import MagnifyingGlass from "~/components/ui/icons/MagnifyingGlass"
import Manufacturer from "~/components/ui/icons/Manufacturer"
import Map from "~/components/ui/icons/Map"
import Mountains from "~/components/ui/icons/Mountains"
import NearLabel from "~/components/ui/icons/NearLabel"
import Owner from "~/components/ui/icons/Owner"
import PencilUnderlined from "~/components/ui/icons/PencilUnderlined"
import People from "~/components/ui/icons/People"
import Settings from "~/components/ui/icons/Settings"
import SettingsCog from "~/components/ui/icons/SettingsCog"
import SubContractor from "~/components/ui/icons/SubContractor"
import ThumbsDown from "~/components/ui/icons/ThumbsDown"
import ThumbsUp from "~/components/ui/icons/ThumbsUp"
import TrashCan from "~/components/ui/icons/TrashCan"
import Upload from "~/components/ui/icons/Upload"
import ZoomOutOutlined from "~/components/ui/icons/ZoomOutOutlined"
import ZoomInOutlined from "~/components/ui/icons/ZoomInOutlined"

export default {
    theme: {
        options: {
            customProperties: true, // Maps all theme colors to css variables (i.e. background: var(--v-primary-base);)
        },
        themes: {
            light: {
                primary: '#2480EB',
                "primary-lighter": '#BCD6f6',
                "primary-light": '#66A6F1',
                'secondary-text': '#C6D8FF',
                "primary-text": '#313D4F',
                "grey-text": "#676767",
                "light-text": '#838B95',
                disabled: "rgba(0, 0, 0, 0.38)",
                "main-background": '#F5F6FA',
                "border-grey": '#DBDBDB',
                inactive: '#93ACC9',
                "light-blue-grey": '#D0DAE8',
                white: '#fff',
                'white-dark': '#F5F6FA',
                black: '#000',
                "light-grey": '#ECECEE',
                grey: '#838B95',
                "light-purple": '#BCC5E8',
                "light-yellow": '#FAF5CB',
                "yellow": '#CBB700',
                'light-green': '#EAFFEC',

                error: '#DE132B',
                'error-light': '#F93C65',
                warning: '#E4A80F',
                'warning-light': '#ECBB0C',
                success: '#2ECC71',
                "success-darker": '#009872'

                // secondary: '#424242',
                // accent: '#82B1FF',
                // info: '#2196F3',
            },
        }
    },
    icons: {
        // reference with $vuetify.icons[<icon name>]
        values: {
            a_plus_circled: {
                component: APlusCircled
            },
            architect: {
                component: Architect
            },
            arrow_refresh: {
                component: ArrowRefresh
            },
            arrow_rotate: {
                component: ArrowRotate
            },
            arrow_line_down: {
                component: ArrowLineDown
            },
            arrow_down: {
                component: ArrowDown
            },
            buildings: {
                component: Buildings
            },
            checkmark_circled: {
                component: CheckmarkCircled
            },
            close: {
                component: Close
            },
            close_small: {
                component: CloseSmall
            },
            envelope: {
                component: Envelope
            },
            flag: {
                component: Flag
            },
            general_contractor: {
                component: GeneralContractor
            },
            hammer: {
                component: Hammer
            },
            info: {
                component: Info
            },
            key_outline: {
                component: Owner
            },
            linkage: {
                component: Linkage
            },
            location: {
                component: Location
            },
            magnifying_glass: {
                component: MagnifyingGlass
            },
            manufacturer: {
                component: Manufacturer
            },
            map: {
                component: Map
            },
            mountains: {
                component: Mountains
            },
            near_label: {
                component: NearLabel
            },
            pencil_underlined: {
                component: PencilUnderlined
            },
            people: {
                component: People
            },
            settings: {
                component: Settings
            },
            setting_cog: {
                component: SettingsCog
            },
            sub_contractor: {
                component: SubContractor
            },
            thumbs_down: {
                component: ThumbsDown
            },
            thumbs_up: {
                component: ThumbsUp
            },
            trash_can: {
                component: TrashCan
            },
            house: {
                component: HouseIcon,
            },
            chevron_down_large: {
                component: ChevronDown
            },
            chevron_down_circled: {
                component: ChevronDownCircle
            },
            chevron_left_large: {
                component: ChevronLeft
            },
            chevron_up_large: {
                component: ChevronUp
            },
            chevron_right_large: {
                component: ChevronRight
            },
            chevron_down: {
                component: ChevronDownSmall
            },
            chevron_left: {
                component: ChevronLeftSmall
            },
            chevron_right: {
                component: ChevronRightSmall
            },
            chevron_up: {
                component: ChevronUpSmall
            },
            zoom_out_outlined: {
                component: ZoomOutOutlined
            },
            upload: {
                component: Upload
            },
            zoom_in_outlined: {
                component: ZoomInOutlined
            }
        },
    },
}
