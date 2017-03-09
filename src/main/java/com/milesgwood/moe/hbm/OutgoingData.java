/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.milesgwood.moe.hbm;

import java.util.List;
import org.hibernate.Session;

/**
 *
 * @author vicetad
 */
public class OutgoingData{
    
    /**
     * Gets a single show out of the database
     * @return 
     */
    public static Shows retrieveShow(){
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List<Shows> results = session.createQuery("from Shows").setMaxResults(1).list();
        session.close();
        Shows newShow = results.get(0);
        return newShow;
    }
    
    /**
     * Gets a single Songs object out of the database
     * @return 
     */
    public static Songs retrieveSongs(){
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List<Songs> results = session.createQuery("from Songs").setMaxResults(1).list();
        session.close();
        Songs newSong = results.get(0);
        return newSong;
    }
}
