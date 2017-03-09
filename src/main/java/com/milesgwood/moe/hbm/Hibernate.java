/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.milesgwood.moe.hbm;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

/**
 *
 * @author vicetad
 */
public class Hibernate {

    //There is only ONE session factory per application run.
    private static SessionFactory sessionFactory = null;

    public static SessionFactory getSessionFactory() {
        if(sessionFactory == null) setUp();
        return sessionFactory;
    }

    /**
     * Called one time to setup the Session Factory
     * @throws Exception 
     */
    public static void setUp() {
        if (sessionFactory == null){
        // A SessionFactory is set up once for an application!
        final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
                .configure() // configures settings from hibernate.cfg.xml
                .build();
        try {
            sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
        } catch (Exception e) {
            // The registry would be destroyed by the SessionFactory, but we had trouble building the SessionFactory
            // so destroy it manually.
            StandardServiceRegistryBuilder.destroy(registry);
            Logger.getLogger(Hibernate.class.getName()).log(Level.SEVERE, null, e);
        }
        }
    }

    /**
     * This should get called one time to shut down the application.
     * @throws Exception 
     */
    public static void tearDown() throws Exception {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }
}
