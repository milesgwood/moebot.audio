/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.milesgwood.moe.hbm.Hibernate;
import com.milesgwood.moe.hbm.Shows;
import com.milesgwood.moe.hbm.Songs;
import java.util.List;
import junit.framework.TestCase;
import org.hibernate.Session;
import static org.junit.Assert.assertNotEquals;
import org.junit.Test;

/**
 *
 * @author vicetad
 */
public class TestingHibernate extends TestCase {
    
    public TestingHibernate(String testName) {
        super(testName);
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
        Hibernate.setUp();
    }
   
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
        //Hibernate.tearDown();
    }
    
    @Test
    public void testIfAnyShowsExist() {
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List result = session.createQuery("from Shows").list();
        assert(result.size() > 10);
        session.getTransaction().commit();
        session.close();
    }
    
    @Test
     public void testIfAnySongsExist() {
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List result = session.createQuery("from Songs").list(); 
        //this huge size only works with lazy as true
        assert(result.size() > 10);
        session.getTransaction().commit();
        session.close();
    }
     
    @Test
     public void testIfShowAndSongHaveTheSameID() {
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List<Shows> result = session.createQuery("from Shows").setMaxResults(10).list();
        assert(result.size() == 10);
        Shows show = result.get(1);
        assertNotEquals(show.getId(), show.getSetList().iterator().next().getId());
        session.getTransaction().commit();
        session.close();
    } 
}
