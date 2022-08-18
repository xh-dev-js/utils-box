import React, {ReactElement} from "react";
import {StringUtils} from "pyyqww_t1/dist";

export module BootstrapCardModule {
    type BootstrapCardProps = {
        componentName: string,
        component: ReactElement,
        extraClass: string
    }
    export const BootstrapCard = (props: BootstrapCardProps) => {
        return (
            <>
                <div className={StringUtils.nameStyleDelimiter(props.componentName)+' '+props.extraClass}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{props.componentName}</h5>
                            {props.component}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    BootstrapCard.defaultProps = {
        extraClass: ''
    }
}