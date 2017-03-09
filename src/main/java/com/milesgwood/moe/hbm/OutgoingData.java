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
    
    public static Shows retrieveShow(){
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List<Shows> results = session.createQuery("from Shows").setMaxResults(1).list();
        Shows newShow = results.get(0);
        return newShow;
    }
}
