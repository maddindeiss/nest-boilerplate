import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class PrefixTransformer implements ValueTransformer {
    to(value: any): any {
        console.log('to');
        console.log(value);
        return value;
    }

    from(value: any): any {
        console.log('from');
        console.log(value);
        return value;
    }

}
