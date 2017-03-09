/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.milesgwood.moe.hbm.Hibernate;
import com.milesgwood.moe.hbm.OutgoingData;
import com.milesgwood.moe.hbm.Shows;
import com.milesgwood.moe.hbm.Songs;
import java.io.File;
import java.io.IOException;
import junit.framework.TestCase;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author vicetad
 */
public class TestJavaToJson extends TestCase{

    public TestJavaToJson() {
    }

    @BeforeClass
    public static void setUpClass() {
        Hibernate.setUp();
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @Test
    public void testSongParse() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Songs obj = OutgoingData.retrieveSongs();
//        
//        //Object to JSON in file
//        mapper.writeValue(new File("jsonOut.txt"), obj);

        //Object to JSON in String
        String jsonInString = mapper.writeValueAsString(obj);
//        System.out.println(jsonInString);
//        
//        // Convert object to JSON string and pretty print
//        jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
//        System.out.println(jsonInString);
        assert(jsonInString.length() > 0);
    }
    
    @Test
    public void testShowParse() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Shows obj = OutgoingData.retrieveShow();
        
//        //Object to JSON in file
//        mapper.writeValue(new File("jsonShowsOut.txt"), obj);

        //Object to JSON in String
        String jsonInString = mapper.writeValueAsString(obj);
//        System.out.println(jsonInString);
//        
//        // Convert object to JSON string and pretty print
//        jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
//        System.out.println(jsonInString);
        assert(jsonInString.length() > 0);
    }
    
}
