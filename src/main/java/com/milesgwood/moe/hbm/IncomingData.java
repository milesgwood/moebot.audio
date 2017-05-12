/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.milesgwood.moe.hbm;

import org.hibernate.Session;

/**
 *
 * @author milesgwood
 */
public class IncomingData {
    
    public static void updateSongScore(int id, int score){
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        Songs song =  (Songs) session.get(Songs.class, id);
        song.setScore(score);
        session.update(song);
        session.getTransaction().commit();
        session.close();
    }  
}
