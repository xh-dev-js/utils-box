export module BootstrapHelper {
    export class IdNamePair{
        constructor(private valueName: string) {
        }

        name():string{
           return this.valueName+"_name"
        }

        id():string{
            return this.valueName+"_id"
        }

    }

}