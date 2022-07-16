import Fun2 from './Fun2.client'

// import Router, { useRouter } from 'next/router'
// import { useApp } from 'app/WkApp/context'
// import { useRouter} from 'next/router'

export default function Fun(props) {
    // const app = useApp()
    // console.log('Hi', app)

    return (
        <div
            id="fun"
            style={{
                display: 'flex',

                backgroundColor: props.color,
                padding: '20px',

                // alignSelf: 'stretch',
                // width: 'inherit',
                width: '98%',
                overflow: 'hidden',
            }}
            data-server
        >
            {/* {props.children} */}
            <Fun2 color={props.color} />
        </div>
    )
}
