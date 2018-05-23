package pl.edu.pw.elka.tin.spy.spyweb.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.Task;
import pl.edu.pw.elka.tin.spy.spyweb.application.domain.TaskRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;

@Controller
public class ImagesController {

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping(value = "/image/{id}", method = RequestMethod.GET, produces = "image/jpg")
    public @ResponseBody
    byte[] getImage(@PathVariable Integer id) {
        Task task = this.taskRepository.findById(id).orElseThrow(RuntimeException::new);

        try {
            // Retrieve image from the classpath.
            File file = new File(task.getFileUrl());
            InputStream is = new FileInputStream(file);

            // Prepare buffered image.
            BufferedImage img = ImageIO.read(is);

            // Create a byte array output stream.
            ByteArrayOutputStream bao = new ByteArrayOutputStream();

            // Write to output stream
            ImageIO.write(img, "jpg", bao);

            return bao.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
