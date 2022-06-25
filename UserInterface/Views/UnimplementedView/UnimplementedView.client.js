// import type { ViewProps } from './ViewPropTypes'

// import ViewNativeComponent from './ViewNativeComponent'
// import TextAncestor from '../../Text/TextAncestor'
// import * as React from 'react'
// import UnimplementedView from 'modules/react-native-web/src/modules/UnimplementedView'

import React from 'react'

/**
@exports
@typedef {{
display: 'flex' | 'grid' }} ViewStyleProp */

/**
@exports
@typedef {{
children?: Node
id?: string
style?: ViewStyleProp }} ViewProps */

/**
@type {React.AbstractComponent<ViewProps, React.ElementRef<typeof ViewNativeComponent>>} */
const UnimplementedView = React.forwardRef(
    /**
     @param {ViewProps} props */
    (props, forwardedRef) => {
        return (
            <div
                ref={forwardedRef}
                style={{
                    alignSelf: 'flex-start',
                    borderColor: 'red',
                    borderWidth: 1,
                }}
            >
                {props.children}
            </div>
        )
    },
)

export default UnimplementedView
