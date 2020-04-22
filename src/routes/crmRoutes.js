import {  addNewContact, 
          getContacts, 
          getContactWithID,
          updateContact,
          deleteContact 
        } from '../controllers/crmController';

import {nuevoItem} from '../controllers/inventarioController';

import {login,register,loginRequired} from '../controllers/userControllers';

const routes = async (app) => {

  const appRouteInventario = app.route('/inventario');

  appRouteInventario

    .get()
    .post(nuevoItem);


   const appRouteContact = app.route('/contact');

   appRouteContact
        .get(
            (req, res, next) => 
              { 
                console.log(`Request From ${req.originalUrl}`);
                console.log(`Request Type ${req.method}`);
                next();
              }, loginRequired, getContacts)

        .post( loginRequired,addNewContact);

    const appRouteContactID = app.route('/contact/:contactID');


    appRouteContactID

        .get( loginRequired,getContactWithID)

        .put( loginRequired,updateContact)

        .delete( loginRequired,deleteContact);

    const appRegistration = app.route('/auth/register');

    appRegistration

        .post(register);

    const appLogin = app.route('/login');
    
    appLogin

        .post(login);


};

export default routes;