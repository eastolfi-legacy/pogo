import { Set } from "es6-set";

export class Utils {
    static uniques(array: any[]) {
        return [...new Set(array)];
    }

    static round(number: number, precision: number) {
        const shift = function (number: number, precision: number, reverseShift: boolean) {
            if (reverseShift) {
                precision = -precision;
            }
            let numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };

        return shift(Math.round(shift(number, precision, false)), precision, true);
    }
}
