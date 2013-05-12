/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/13/13
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone'], function (Backbone){
    var Command = Backbone.Model.extend({
        defaults: {
            command:"eval"
        },
        url:"jsconsole/command"
    });
    return Command;
});