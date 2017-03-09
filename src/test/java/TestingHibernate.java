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
import org.junit.AfterClass;
import static org.junit.Assert.assertNotEquals;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author vicetad
 */
public class TestingHibernate extends TestCase {
    
    public TestingHibernate(String testName) {
        super(testName);
    }
    
    @BeforeClass
    public static void setUpClass() {
        Hibernate.setUp();
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
        Hibernate.tearDown();

    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
   
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }
    
    @Test
    public void testIfAnyShowsExist() {
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List result = session.createQuery("from Shows").setMaxResults(3).list();
        assert(result.size() > 2);
        session.getTransaction().commit();
        session.close();
    }
    
    @Test
     public void testIfAnySongsExist() {
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List result = session.createQuery("from Songs").setMaxResults(3).list(); 
        //this huge size only works with lazy as true
        assert(result.size() > 2);
        session.getTransaction().commit();
        session.close();
    }
     
    @Test
     public void testIfShowAndSongHaveTheSameID() {
        Session session = Hibernate.getSessionFactory().openSession();
        session.beginTransaction();
        List<Shows> result = session.createQuery("from Shows").setMaxResults(5).list();
        assert(result.size() == 5);
        Shows show = result.get(1);
        assertNotEquals(show.getId(), show.getSetList().iterator().next().getId());
        session.getTransaction().commit();
        session.close();
    } 
}
