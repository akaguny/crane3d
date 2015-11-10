/**
 * Created by alexey on 10.11.15.
 */
(function(){
    // звено pn = [[x,y]]
    var p = [
            [0,1],//p[1]
            [1,1],//p[2]
            [2,1] //p[3]
        ],
        t = [1.5,0.5], // цель t = [x,y]
        d = [0, 0, 0, 0], // длины звеньев
        dist = 0, // дистанция
        lambda = 0, // ???
        tol = 1, // максимально допустимое растояние между конечным узлом и целью
        b = 0, // переменная для хранения позиции узла 1, если цель достижима
        DIFa = 0, //дистанция между конечным узлом и целевой позицией

        sum = 0; // переменная для хранения суммы


    for (var i=1; i< d.length;i++){
        d[i] = Math.abs(Math.sqrt((p[i+1][2]-p[i][2])^2+(p[i+1][1]-p[i][1])^2));
    } // можно запихнуть вычисление длины в функцию, и использовать метод forEach
    // для перебора

    // Дистанция между корнем и целью
    // Расстояние между 2 отрезками выч. по формуле
    // (x1-x2)^2+(y1-y2)^2 - теорема пифагора
    // Math.abs(x) - модуль x
    dist = Math.abs(Math.sqrt((t[2]-p[1][2])^2+(t[1]-p[1][1])^2));

    sum = d.forEach(function(){sum += d[i];});
    if (dist > sum)
    {
        window.alert("Цель недостежима!");
    }
    else
    {
        b=p[1];
        DIFa =  Math.abs(Math.sqrt((p[3][2]-t[2])^2+(p[3][1]-t[1])^2));
        while (DIFa > tol){
            p[3]=t;
            for (var i = p.length-1; i>=1; i--){
                var r;
                r[i] = Math.abs(Math.sqrt((p[i+1][2]-p[i][2])^2+(p[i+1][1]-p[i][1])^2));
                lambda[i] = d[i] / r[i];
                p[i] = (1-lambda[i])*p[i+1]+lambda[i]*p[i];
                }
            p[i]=b;
            for (var i = 1;i< p.length; i++){
                var r;
                r[i] = Math.abs(Math.sqrt((p[i+1][2]-p[i][2])^2+(p[i+1][1]-p[i][1])^2));
                lambda[i] = d[i] / r[i];
                p[i+1] = (1-lambda[i])*p[i]+lambda[i]*p[i+1];
            }
            DIFa = Math.abs(Math.sqrt((p[3][2]-t[2])^2+(p[3][1]-t[1])^2));
        }
    }


});