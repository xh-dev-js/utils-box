import React, {ReactElement} from "react";

export module NavBarModule {
    type TopNavProps = {
        content: ReactElement
    }
    export const TopNavBar = (props: TopNavProps) => {
        return (
            <nav className={'nav fixed-top topBar'}>
                {props.content}
            </nav>
        )
    }
}