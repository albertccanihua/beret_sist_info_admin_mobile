export class DateHelper {
    static formatDate(value: string, connector: string = '-'): string {

        let initialDate = new Date(value);

        let year = initialDate.getFullYear().toString();
        let month = (initialDate.getMonth() + 1).toString();
        let date = initialDate.getDate().toString();

        if (parseInt(month) < 10) {
            month = '0' + month;
        }

        if (parseInt(date) < 10) {
            date = '0' + date;
        }

        return date + connector + month + connector + year;
    }

    static getCurrentFormatDate() {
        let initialDate = new Date();

        let year = initialDate.getFullYear().toString();
        let month = (initialDate.getMonth() + 1).toString();
        let date = initialDate.getDate().toString();

        if (parseInt(month) < 10) {
            month = '0' + month;
        }

        if (parseInt(date) < 10) {
            date = '0' + date;
        }

        return year + '-' + month + '-' + date;
    }
}
