/**
 * Copyright 2020 Fincura
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/


module.exports = function(RED) {
    "use strict";

    function FincuraApiCredentialsNode (config) {
        RED.nodes.createNode(this, config);
        this.creds_name = config.creds_name;
    }

    RED.nodes.registerType("fincura-api-credentials", FincuraApiCredentialsNode, {
        credentials: {
            creds_name: {type: "text"},
            refresh_token: {type: "password"},
        }
    });

    // Setup admin callbacks

    RED.httpAdmin.get('/example/spreadingTemplates/:id', RED.auth.needsPermission(""), function(req, res, next) {
        getJwt(req.params.id).then(function(jwtConfig){
            api_client.spreadingTemplates.get(jwtConfig.account_id, jwtConfig.jwt).then(function(dTemplatesResp){
                res.json(dTemplatesResp.spreadingTemplates.results);
            });
        }).catch(function(err){
            console.log(err);
            res.json([err]);
        });
    });
};