// import WkPage from '../app/WkPage/WkPage.server'
import WkPage from '../app/WkPage/WkPage.client'
import WkMenu from '../app/WkMenu/WkMenu.client'
import WkSettings from 'app/WkSettings/WkSettings.client'
import { CurvedArrow } from 'app/WTF/Curve'

export default function Page(props) {
    return (
        <WkPage>
            {/* <WkMenu /> */}
            <WkSettings />
            {/* <DrawCurves /> */}
        </WkPage>
    )
}
