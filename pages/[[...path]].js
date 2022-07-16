// import WkPage from '../app/WkPage/WkPage.server'
/* 
export default function Page(props) {
    return <div><h1>Helllooooo</h1></div>
}
*/
import WkPage from '../app/WkPage/WkPage.client'
import WkMenu from '../app/WkMenu/WkMenu.client'
import WkSettings from 'app/WkSettings/WkSettings.client'
import { CurvedArrow } from 'app/WTF/Curve'
// import Fun from 'app/WTF/Fun.server'
// import Fun2 from 'app/WTF/Fun2.client'
// import Fun from '[[...path]]'
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'

const Fun = dynamic(async () => import('app/WTF/Fun.server.js'), {
    suspense: true,
})

export default function Page(props) {
    // console.log('Props', props)
    const clientRouter = useRouter()

    return (
        <>
            {/* <Fun>
                <Fun2 />
            </Fun> */}
            <WkPage>
                <Fun
                    color={
                        (clientRouter?.query || props?.router?.query)
                            ?.path?.[0] || 'green'
                    }
                />
                {/* <Fun2 {...props} /> */}
                <WkSettings />
            </WkPage>
        </>
    )
}
