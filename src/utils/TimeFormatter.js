export default class TimeFormatter {

    inputFormatDate (date){
        
        var dd = date.getDate(); 
        var mm = date.getMonth() + 1; 
        
        var yyyy = date.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        
        date = yyyy + '-' + mm + '-' + dd;
        return date
    }

    formatDate (date){
        date = new Date(date)
        
        var dd = date.getDate(); 
        var mm = date.getMonth() + 1; 
        
        var yyyy = date.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        
        date = dd + '/' + mm + '/' + yyyy;
        return date
    }
}