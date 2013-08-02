/**
 * Created with JetBrains WebStorm.
 * User: lenovo
 * Date: 13-7-23
 * Time: 上午9:58
 * To change this template use File | Settings | File Templates.
 */
var app=angular.module("problemSwitcher",[]);
app.factory("data", function() {
    return {
        problems : [
            {
                "id":1,
                "question":"1+2=？",
                "choices":[
                    {id:0,"question":"A.3","is_correct":true},
                    {id:1,"question":"B.5","is_correct":false},
                    {id:2,"question":"C.4","is_correct":false},
                    {id:3,"question":"D.6","is_correct":false}
                ]
            },
            {
                "id":2,
                "question":"5*6=？",
                "choices":[
                    {id:0,"question":"A.15","is_correct":false},
                    {id:1,"question":"B.25","is_correct":false},
                    {id:2,"question":"C.20","is_correct":false},
                    {id:3,"question":"D.30","is_correct":true}
                ]
            },
            {
                "id":3,
                "question":"36-8=？",
                "choices":[
                    {id:0,"question":"A.24","is_correct":true},
                    {id:1,"question":"B.26","is_correct":false},
                    {id:2,"question":"C.27","is_correct":false},
                    {id:3,"question":"D.16","is_correct":false}
                ]
            }
        ]
    }
});

USERDATA = {};

var MyCtrl = app.controller("MyCtrl",function($scope,data) {
    $scope.problems = data.problems;

    $scope.show = [];
    for(i=0;i<$scope.problems.length;i++){
        $scope.show.push(false);
    }


    $scope.initData = function(){
        $scope.start=true;
        $scope.show[0] = true;
    }


    $scope.Show = function(pid){
        if($scope.show[pid]){
            return true;
        }else{
            return false;
        }

    }


    $scope.Next = function(pid){
        if($scope.show[pid] !== undefined || $scope.show[pid] !== null){
            $scope.show[pid-1] = false;
            if(pid == $scope.problems.length){
                $scope.summary = true;
            }else{
                $scope.show[pid] = true;
            }
        }
    }

    $scope.result = function(){
        var accuracy = 0;

        for(var i=1;i<=$scope.problems.length;i++){
            if(USERDATA[i]!==undefined && USERDATA[i]!==null && USERDATA[i].is_correct){
                accuracy++;
            }
        }

        return accuracy;
    }

});

app.directive("lesson",function(){
    return {
        restrict:"E"
    };
});

app.directive("problem",function(data){
    return {
        restrict:"E",

         link:function(scope,element){
            scope.$watch('answer',function(value){
                if(scope.problem.choices[value] !== undefined && scope.problem.choices[value] !== null){
                    if(scope.problem.choices[value].is_correct){;
                        USERDATA[scope.problem.id] = {"is_correct":true};
                    } else{
                        USERDATA[scope.problem.id] = {"is_correct":false};
                    }

                }
            })
        }
    };
});




app.directive("result",function(){
    return {
        restrict:"E"




    }
});

